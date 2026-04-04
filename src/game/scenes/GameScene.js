/**
 * GameScene — The main "Speak-to-Play" game loop.
 *
 * Flow:
 * 1. Show target text (pulsing)
 * 2. TTS speaks the audioPrompt
 * 3. Show "Pulsing Ear" → mic is active
 * 4. Capture speech → check validMatches with .some()
 * 5. Correct → mascot bounce + particles + next
 * 6. Wrong → shake + retry
 */
import Phaser from 'phaser';
import MascotSprite from '../sprites/MascotSprite';
import { CURRICULUM, getShuffled, checkSpeechMatch } from '../../data/curriculum';
import SpeechManager from '../../services/SpeechManager';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create(data) {
    const { width, height } = this.scale;

    this.category = data.category || 'bm_kv';
    this._onScore = data.onScore || (() => {});
    this._onTranscriptUpdate = data.onTranscriptUpdate || (() => {});

    // Items queue — limit math to 10 items per session for young children
    let items = getShuffled(this.category);
    if (this.category === 'math') {
      items = items.slice(0, 10);
    }
    this.items = items;
    this.currentIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.attempts = 0;

    // Background
    this.cameras.main.setBackgroundColor(0xf0f9ff);

    // ─── UI Elements ────────────────────────────────────────────────────────────
    // Back button
    const backBtn = this.add
      .text(16, 12, '← Back', {
        fontFamily: '"Fredoka One", cursive',
        fontSize: '14px',
        color: '#f43f5e',
        backgroundColor: 'rgba(244,63,94,0.1)',
        padding: { x: 10, y: 6 },
      })
      .setInteractive({ useHandCursor: true });

    backBtn.on('pointerdown', () => {
      SpeechManager.stop();
      SpeechManager.stopSpeaking();
      // Game will be destroyed by React when user clicks back
      this.game.destroy(true);
    });

    // Score display
    this.scoreText = this.add
      .text(width - 16, 14, '⭐ 0', {
        fontFamily: '"Fredoka One", cursive',
        fontSize: '16px',
        color: '#f59e0b',
      })
      .setOrigin(1, 0);

    // Streak display
    this.streakText = this.add
      .text(width - 16, 36, '🔥 0', {
        fontFamily: '"Nunito", sans-serif',
        fontSize: '13px',
        color: '#ef4444',
        fontStyle: 'bold',
      })
      .setOrigin(1, 0);

    // Category label
    this.add
      .text(width / 2, 14, this._getCategoryLabel(), {
        fontFamily: '"Fredoka One", cursive',
        fontSize: '13px',
        color: '#64748b',
      })
      .setOrigin(0.5, 0);

    // ─── Target text area ───────────────────────────────────────────────────────
    // Card background
    const cardY = height * 0.25;
    const cardW = Math.min(width - 40, 340);
    const cardH = 120;

    this.card = this.add.graphics();
    this.card.fillStyle(0xffffff, 0.92);
    this.card.fillRoundedRect(width / 2 - cardW / 2, cardY - cardH / 2, cardW, cardH, 20);
    this.card.lineStyle(3, 0x0ea5e9, 0.3);
    this.card.strokeRoundedRect(width / 2 - cardW / 2, cardY - cardH / 2, cardW, cardH, 20);

    // Target text
    this.targetText = this.add
      .text(width / 2, cardY, '', {
        fontFamily: '"Fredoka One", cursive',
        fontSize: Math.min(64, width * 0.16) + 'px',
        color: '#1e1b4b',
        align: 'center',
      })
      .setOrigin(0.5);

    // Prompt text (instruction)
    this.promptText = this.add
      .text(width / 2, cardY + cardH / 2 + 16, '', {
        fontFamily: '"Nunito", sans-serif',
        fontSize: '14px',
        color: '#64748b',
        align: 'center',
        fontStyle: 'bold',
      })
      .setOrigin(0.5, 0);

    // ─── Pulsing Ear (mic indicator) ────────────────────────────────────────────
    const earY = height * 0.55;

    // Pulse rings
    this.pulseRing1 = this.add.circle(width / 2, earY, 38, 0x0ea5e9, 0.15);
    this.pulseRing2 = this.add.circle(width / 2, earY, 38, 0x0ea5e9, 0.08);

    // Ear circle
    this.earBg = this.add.circle(width / 2, earY, 32, 0x0ea5e9, 1);
    this.earText = this.add
      .text(width / 2, earY, '👂', {
        fontSize: '28px',
      })
      .setOrigin(0.5);

    this.micLabel = this.add
      .text(width / 2, earY + 42, 'Listening...', {
        fontFamily: '"Nunito", sans-serif',
        fontSize: '12px',
        color: '#0ea5e9',
        fontStyle: 'bold',
      })
      .setOrigin(0.5, 0);

    this._setMicVisible(false);

    // ─── Feedback area ──────────────────────────────────────────────────────────
    this.feedbackText = this.add
      .text(width / 2, height * 0.72, '', {
        fontFamily: '"Fredoka One", cursive',
        fontSize: '20px',
        color: '#10b981',
        align: 'center',
      })
      .setOrigin(0.5)
      .setAlpha(0);

    // ─── Mascot ─────────────────────────────────────────────────────────────────
    const mascotX = width * 0.82;
    const mascotY = height * 0.88;
    this.mascot = new MascotSprite(this, mascotX, mascotY, Math.min(32, width * 0.08));

    // ─── Progress bar ───────────────────────────────────────────────────────────
    this.progressBg = this.add.graphics();
    this.progressFill = this.add.graphics();
    this.progressLabel = this.add
      .text(width / 2, height - 16, '', {
        fontFamily: '"Nunito", sans-serif',
        fontSize: '11px',
        color: '#94a3b8',
        fontStyle: 'bold',
      })
      .setOrigin(0.5, 1);

    this._drawProgress();

    // ─── Particle emitter (for correct answers) ─────────────────────────────────
    this._setupParticles();

    // ─── Set up transcript listener for DevOverlay ──────────────────────────────
    SpeechManager.onTranscript((data) => {
      this._onTranscriptUpdate(data);
    });

    // ─── Start the first round ──────────────────────────────────────────────────
    this.time.delayedCall(600, () => this._showItem());
  }

  // ── Helpers ─────────────────────────────────────────────────────────────────

  _getCategoryLabel() {
    const labels = {
      bm_kv: '🇲🇾 Suku Kata KV',
      bm_kvk: '🇲🇾 Suku Kata KVK',
      en_phonics: '🇬🇧 English Phonics',
      math: '🔢 Math 1–100',
    };
    return labels[this.category] || this.category;
  }

  _setMicVisible(val) {
    [this.pulseRing1, this.pulseRing2, this.earBg, this.earText, this.micLabel].forEach(
      (o) => o.setVisible(val)
    );

    if (val) {
      // Pulse animation
      this.tweens.add({
        targets: this.pulseRing1,
        scaleX: 1.8,
        scaleY: 1.8,
        alpha: 0,
        duration: 1200,
        repeat: -1,
        ease: 'Sine.easeOut',
      });
      this.tweens.add({
        targets: this.pulseRing2,
        scaleX: 2.2,
        scaleY: 2.2,
        alpha: 0,
        duration: 1500,
        delay: 300,
        repeat: -1,
        ease: 'Sine.easeOut',
      });
    } else {
      this.tweens.killTweensOf(this.pulseRing1);
      this.tweens.killTweensOf(this.pulseRing2);
      this.pulseRing1.setScale(1).setAlpha(0.15);
      this.pulseRing2.setScale(1).setAlpha(0.08);
    }
  }

  _drawProgress() {
    const { width, height } = this.scale;
    const barW = Math.min(width - 60, 300);
    const barH = 8;
    const barX = (width - barW) / 2;
    const barY = height - 36;

    this.progressBg.clear();
    this.progressBg.fillStyle(0xe2e8f0, 1);
    this.progressBg.fillRoundedRect(barX, barY, barW, barH, 4);

    const progress = this.items.length > 0
      ? Math.min(this.currentIndex / this.items.length, 1)
      : 0;

    this.progressFill.clear();
    if (progress > 0) {
      this.progressFill.fillStyle(0x0ea5e9, 1);
      this.progressFill.fillRoundedRect(barX, barY, barW * progress, barH, 4);
    }

    this.progressLabel.setText(
      `${Math.min(this.currentIndex + 1, this.items.length)} / ${this.items.length}`
    );
  }

  _setupParticles() {
    // Create a simple star texture programmatically
    const gfx = this.add.graphics();
    gfx.fillStyle(0xfbbf24, 1);
    gfx.fillCircle(8, 8, 8);
    gfx.generateTexture('particle_star', 16, 16);
    gfx.destroy();

    this.emitter = this.add.particles(0, 0, 'particle_star', {
      speed: { min: 100, max: 250 },
      angle: { min: 220, max: 320 },
      scale: { start: 0.6, end: 0 },
      lifespan: 800,
      gravityY: 300,
      quantity: 0,
      emitting: false,
      tint: [0xfbbf24, 0x0ea5e9, 0xf43f5e, 0x10b981, 0x7c3aed],
    });
  }

  _emitParticles(x, y) {
    this.emitter.setPosition(x, y);
    this.emitter.explode(12);
  }

  // ── Game flow ───────────────────────────────────────────────────────────────

  async _showItem() {
    if (this.currentIndex >= this.items.length) {
      this._showComplete();
      return;
    }

    const item = this.items[this.currentIndex];
    this.attempts = 0;

    // Update target text with pop animation
    this.targetText.setText(item.text);
    this.targetText.setScale(0.5).setAlpha(0);
    this.tweens.add({
      targets: this.targetText,
      scaleX: 1,
      scaleY: 1,
      alpha: 1,
      duration: 350,
      ease: 'Back.easeOut',
    });

    // Update prompt
    this.promptText.setText(item.audioPrompt);
    this.feedbackText.setAlpha(0);

    this._drawProgress();

    // TTS speaks the prompt
    await SpeechManager.speak(item.audioPrompt, item.lang);

    // Short delay then listen
    this.time.delayedCall(300, () => {
      if (this.scene.isActive()) {
        this._startListening(item);
      }
    });
  }

  _startListening(item) {
    this._setMicVisible(true);

    SpeechManager.listen(
      item.lang,
      // onResult
      (transcript, confidence) => {
        this._setMicVisible(false);
        const isCorrect = checkSpeechMatch(item, transcript);

        if (isCorrect) {
          this._handleCorrect(item, transcript);
        } else {
          this._handleWrong(item, transcript);
        }
      },
      // onError
      (error) => {
        this._setMicVisible(false);
        console.warn('[SpeechManager] error:', error);

        // Auto-retry on transient errors
        if (this.attempts < 3) {
          this.time.delayedCall(500, () => {
            if (this.scene.isActive()) this._startListening(item);
          });
        }
      }
    );
  }

  _handleCorrect(item, transcript) {
    this.score++;
    this.streak++;
    this.attempts = 0;

    this.scoreText.setText(`⭐ ${this.score}`);
    this.streakText.setText(`🔥 ${this.streak}`);

    // Feedback
    this.feedbackText
      .setText('✅ Betul! / Correct!')
      .setColor('#10b981')
      .setAlpha(0)
      .setScale(0.8);

    this.tweens.add({
      targets: this.feedbackText,
      alpha: 1,
      scaleX: 1,
      scaleY: 1,
      duration: 300,
      ease: 'Back.easeOut',
    });

    // Mascot celebration
    this.mascot.bounce();

    // Particles from target text
    this._emitParticles(this.targetText.x, this.targetText.y);

    // Notify React (for XP)
    this._onScore({ correct: true, item, transcript, score: this.score, streak: this.streak });

    // Card flash
    const { width } = this.scale;
    const cardW = Math.min(width - 40, 340);
    const cardH = 120;
    const cardY = this.scale.height * 0.25;

    this.card.clear();
    this.card.fillStyle(0xd1fae5, 0.92);
    this.card.fillRoundedRect(width / 2 - cardW / 2, cardY - cardH / 2, cardW, cardH, 20);
    this.card.lineStyle(3, 0x10b981, 0.5);
    this.card.strokeRoundedRect(width / 2 - cardW / 2, cardY - cardH / 2, cardW, cardH, 20);

    // Next item after delay
    this.time.delayedCall(1800, () => {
      // Reset card color
      this.card.clear();
      this.card.fillStyle(0xffffff, 0.92);
      this.card.fillRoundedRect(width / 2 - cardW / 2, cardY - cardH / 2, cardW, cardH, 20);
      this.card.lineStyle(3, 0x0ea5e9, 0.3);
      this.card.strokeRoundedRect(width / 2 - cardW / 2, cardY - cardH / 2, cardW, cardH, 20);

      this.currentIndex++;
      this._showItem();
    });
  }

  _handleWrong(item, transcript) {
    this.streak = 0;
    this.attempts++;
    this.streakText.setText('🔥 0');

    // Feedback
    this.feedbackText
      .setText(`❌ Cuba lagi! (Heard: "${transcript}")`)
      .setColor('#ef4444')
      .setAlpha(0);

    this.tweens.add({
      targets: this.feedbackText,
      alpha: 1,
      duration: 250,
    });

    // Mascot shake
    this.mascot.shake();

    // Card flash red
    const { width } = this.scale;
    const cardW = Math.min(width - 40, 340);
    const cardH = 120;
    const cardY = this.scale.height * 0.25;

    this.card.clear();
    this.card.fillStyle(0xffe4e6, 0.92);
    this.card.fillRoundedRect(width / 2 - cardW / 2, cardY - cardH / 2, cardW, cardH, 20);
    this.card.lineStyle(3, 0xf43f5e, 0.4);
    this.card.strokeRoundedRect(width / 2 - cardW / 2, cardY - cardH / 2, cardW, cardH, 20);

    // Notify React
    this._onScore({ correct: false, item, transcript, score: this.score, streak: this.streak });

    // Retry after delay (max 3 attempts per item)
    this.time.delayedCall(1500, () => {
      this.card.clear();
      this.card.fillStyle(0xffffff, 0.92);
      this.card.fillRoundedRect(width / 2 - cardW / 2, cardY - cardH / 2, cardW, cardH, 20);
      this.card.lineStyle(3, 0x0ea5e9, 0.3);
      this.card.strokeRoundedRect(width / 2 - cardW / 2, cardY - cardH / 2, cardW, cardH, 20);

      if (this.attempts >= 3) {
        // Skip to next after 3 failed attempts
        this.feedbackText.setText(`Jawapan: ${item.text}`).setColor('#7c3aed').setAlpha(1);
        this.time.delayedCall(1500, () => {
          this.currentIndex++;
          this._showItem();
        });
      } else {
        this._showItem(); // Retry same item
      }
    });
  }

  _showComplete() {
    SpeechManager.stop();
    const { width, height } = this.scale;

    // Hide game UI
    this.targetText.setVisible(false);
    this.promptText.setVisible(false);
    this._setMicVisible(false);
    this.feedbackText.setAlpha(0);

    // Celebration screen
    const overlay = this.add.graphics();
    overlay.fillStyle(0xf0f9ff, 0.95);
    overlay.fillRect(0, 0, width, height);

    this.add
      .text(width / 2, height * 0.18, '🎉', { fontSize: '56px' })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height * 0.32, 'Tahniah! / Well Done!', {
        fontFamily: '"Fredoka One", cursive',
        fontSize: '24px',
        color: '#7c3aed',
        align: 'center',
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height * 0.44, `Skor Anda: ${this.score} / ${this.items.length}`, {
        fontFamily: '"Nunito", sans-serif',
        fontSize: '18px',
        color: '#1e1b4b',
        fontStyle: 'bold',
        align: 'center',
      })
      .setOrigin(0.5);

    // Play Again button
    const btnW = 200;
    const btnH = 48;
    const btnContainer = this.add.container(width / 2, height * 0.6);

    const btnBg = this.add.graphics();
    btnBg.fillStyle(0x0ea5e9, 1);
    btnBg.fillRoundedRect(-btnW / 2, -btnH / 2, btnW, btnH, 24);

    const btnText = this.add
      .text(0, 0, '🔄 Main Lagi', {
        fontFamily: '"Fredoka One", cursive',
        fontSize: '16px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    btnContainer.add([btnBg, btnText]);
    btnContainer.setSize(btnW, btnH);
    btnContainer.setInteractive({ useHandCursor: true });

    btnContainer.on('pointerdown', () => {
      // Restart same category
      this.scene.restart({
        category: this.category,
        onScore: this._onScore,
        onTranscriptUpdate: this._onTranscriptUpdate,
      });
    });

    // Menu button
    const menuContainer = this.add.container(width / 2, height * 0.72);

    const menuBg = this.add.graphics();
    menuBg.fillStyle(0x7c3aed, 1);
    menuBg.fillRoundedRect(-btnW / 2, -btnH / 2, btnW, btnH, 24);

    const menuText = this.add
      .text(0, 0, '🏠 Menu Utama', {
        fontFamily: '"Fredoka One", cursive',
        fontSize: '16px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    menuContainer.add([menuBg, menuText]);
    menuContainer.setSize(btnW, btnH);
    menuContainer.setInteractive({ useHandCursor: true });

    menuContainer.on('pointerdown', () => {
      // Destroy Phaser, React handles navigation
      this.game.destroy(true);
    });

    // Fire lots of particles
    this._emitParticles(width / 2, height * 0.25);
    this.time.delayedCall(200, () => this._emitParticles(width * 0.3, height * 0.3));
    this.time.delayedCall(400, () => this._emitParticles(width * 0.7, height * 0.3));
  }

  // ── Cleanup ─────────────────────────────────────────────────────────────────

  shutdown() {
    SpeechManager.stop();
    SpeechManager.stopSpeaking();
    SpeechManager.onTranscript(null);
  }
}
