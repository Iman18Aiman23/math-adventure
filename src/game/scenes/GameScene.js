/**
 * GameScene — The main "Speak-to-Play" game loop.
 *
 * Cross-platform design:
 *  - Desktop: Auto-listen after TTS prompt
 *  - Mobile: "Tap to Speak" button (user gesture required for mic)
 *  - Retry on no-speech for both platforms
 *  - Visual feedback: pulsing ear, mascot bounce/shake, particles
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
    this._isMobile = SpeechManager.isMobile();

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
    const cardY = height * 0.22;
    const cardW = Math.min(width - 40, 340);
    const cardH = 100;

    this.card = this.add.graphics();
    this._drawCard(0xffffff, 0x0ea5e9);

    // Target text
    this.targetText = this.add
      .text(width / 2, cardY, '', {
        fontFamily: '"Fredoka One", cursive',
        fontSize: Math.min(56, width * 0.14) + 'px',
        color: '#1e1b4b',
        align: 'center',
      })
      .setOrigin(0.5);

    // Prompt text
    this.promptText = this.add
      .text(width / 2, cardY + cardH / 2 + 14, '', {
        fontFamily: '"Nunito", sans-serif',
        fontSize: '13px',
        color: '#64748b',
        align: 'center',
        fontStyle: 'bold',
      })
      .setOrigin(0.5, 0);

    // ─── Pulsing Ear / Mic Indicator ────────────────────────────────────────────
    const earY = height * 0.50;

    this.pulseRing1 = this.add.circle(width / 2, earY, 38, 0x0ea5e9, 0.15);
    this.pulseRing2 = this.add.circle(width / 2, earY, 38, 0x0ea5e9, 0.08);
    this.earBg = this.add.circle(width / 2, earY, 32, 0x0ea5e9, 1);
    this.earText = this.add
      .text(width / 2, earY, '👂', { fontSize: '28px' })
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

    // ─── Tap-to-Speak Button (Mobile) ───────────────────────────────────────────
    const tapBtnY = height * 0.52;
    const tapBtnW = 180;
    const tapBtnH = 50;

    this.tapBtnContainer = this.add.container(width / 2, tapBtnY);

    const tapBg = this.add.graphics();
    tapBg.fillStyle(0x0ea5e9, 1);
    tapBg.fillRoundedRect(-tapBtnW / 2, -tapBtnH / 2, tapBtnW, tapBtnH, 25);

    // Glass highlight
    const tapHighlight = this.add.graphics();
    tapHighlight.fillStyle(0xffffff, 0.2);
    tapHighlight.fillRoundedRect(-tapBtnW / 2, -tapBtnH / 2, tapBtnW, tapBtnH * 0.45, { tl: 25, tr: 25, bl: 0, br: 0 });

    const tapLabel = this.add
      .text(0, 0, '🎤 Tap to Speak', {
        fontFamily: '"Fredoka One", cursive',
        fontSize: '15px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    this.tapBtnContainer.add([tapBg, tapHighlight, tapLabel]);
    this.tapBtnContainer.setSize(tapBtnW, tapBtnH);
    this.tapBtnContainer.setInteractive({ useHandCursor: true });
    this.tapBtnContainer.setVisible(false);

    // Tap button animation
    this.tweens.add({
      targets: this.tapBtnContainer,
      scaleX: 1.05,
      scaleY: 1.05,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.tapBtnContainer.on('pointerdown', () => {
      // Visual press
      this.tweens.add({
        targets: this.tapBtnContainer,
        scaleX: 0.92,
        scaleY: 0.92,
        duration: 80,
        yoyo: true,
      });

      // This IS a user gesture — safe to start recognition on mobile
      this.tapBtnContainer.setVisible(false);
      const item = this.items[this.currentIndex];
      if (item) this._startListening(item);
    });

    // ─── Feedback area ──────────────────────────────────────────────────────────
    this.feedbackText = this.add
      .text(width / 2, height * 0.67, '', {
        fontFamily: '"Fredoka One", cursive',
        fontSize: '18px',
        color: '#10b981',
        align: 'center',
        wordWrap: { width: width - 40 },
      })
      .setOrigin(0.5)
      .setAlpha(0);

    // ─── Mascot ─────────────────────────────────────────────────────────────────
    const mascotX = width * 0.82;
    const mascotY = height * 0.84;
    this.mascot = new MascotSprite(this, mascotX, mascotY, Math.min(30, width * 0.07));

    // ─── Progress bar ───────────────────────────────────────────────────────────
    this.progressBg = this.add.graphics();
    this.progressFill = this.add.graphics();
    this.progressLabel = this.add
      .text(width / 2, height - 14, '', {
        fontFamily: '"Nunito", sans-serif',
        fontSize: '11px',
        color: '#94a3b8',
        fontStyle: 'bold',
      })
      .setOrigin(0.5, 1);

    this._drawProgress();

    // ─── Particle emitter ───────────────────────────────────────────────────────
    this._setupParticles();

    // ─── Set up transcript listener for DevOverlay ──────────────────────────────
    SpeechManager.onTranscript((data) => {
      this._onTranscriptUpdate(data);
    });

    // ─── Start ──────────────────────────────────────────────────────────────────
    this.time.delayedCall(600, () => this._showItem());
  }

  // ── Card Drawing Helper ─────────────────────────────────────────────────────

  _drawCard(fill, stroke) {
    const { width } = this.scale;
    const cardY = this.scale.height * 0.22;
    const cardW = Math.min(width - 40, 340);
    const cardH = 100;

    this.card.clear();
    this.card.fillStyle(fill, 0.92);
    this.card.fillRoundedRect(width / 2 - cardW / 2, cardY - cardH / 2, cardW, cardH, 20);
    this.card.lineStyle(3, stroke, 0.3);
    this.card.strokeRoundedRect(width / 2 - cardW / 2, cardY - cardH / 2, cardW, cardH, 20);
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
      this.tweens.add({
        targets: this.pulseRing1,
        scaleX: 1.8, scaleY: 1.8, alpha: 0,
        duration: 1200, repeat: -1, ease: 'Sine.easeOut',
      });
      this.tweens.add({
        targets: this.pulseRing2,
        scaleX: 2.2, scaleY: 2.2, alpha: 0,
        duration: 1500, delay: 300, repeat: -1, ease: 'Sine.easeOut',
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
    const barY = height - 32;

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
      scaleX: 1, scaleY: 1, alpha: 1,
      duration: 350, ease: 'Back.easeOut',
    });

    // Update prompt
    this.promptText.setText(item.audioPrompt);
    this.feedbackText.setAlpha(0);
    this.tapBtnContainer.setVisible(false);

    this._drawProgress();
    this._drawCard(0xffffff, 0x0ea5e9);

    // TTS speaks the prompt
    if (SpeechManager.isTTSSupported()) {
      await SpeechManager.speak(item.audioPrompt, item.lang);
    }

    // After TTS finishes — begin listening
    this.time.delayedCall(300, () => {
      if (!this.scene.isActive()) return;

      if (this._isMobile) {
        // MOBILE: Show "Tap to Speak" button (requires user gesture)
        this.tapBtnContainer.setVisible(true);
        this.tapBtnContainer.setScale(0.8).setAlpha(0);
        this.tweens.add({
          targets: this.tapBtnContainer,
          scaleX: 1, scaleY: 1, alpha: 1,
          duration: 300, ease: 'Back.easeOut',
        });
      } else {
        // DESKTOP: Auto-start listening
        this._startListening(item);
      }
    });
  }

  _startListening(item) {
    this._setMicVisible(true);
    this.tapBtnContainer.setVisible(false);

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
        console.warn('[GameScene] speech error:', error);

        if (this.attempts < 3) {
          // Show tap button on mobile, auto-retry on desktop
          if (this._isMobile) {
            this.feedbackText
              .setText('🎤 Tap again to try')
              .setColor('#64748b')
              .setAlpha(1);
            this.tapBtnContainer.setVisible(true);
          } else {
            this.time.delayedCall(500, () => {
              if (this.scene.isActive()) this._startListening(item);
            });
          }
        } else {
          // After max retries, skip the item
          this.feedbackText
            .setText(`Jawapan: ${item.text}`)
            .setColor('#7c3aed')
            .setAlpha(1);
          this.time.delayedCall(2000, () => {
            this.currentIndex++;
            this._showItem();
          });
        }
      },
      { retries: this._isMobile ? 1 : 2 } // Fewer auto-retries on mobile since we have tap button
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
      alpha: 1, scaleX: 1, scaleY: 1,
      duration: 300, ease: 'Back.easeOut',
    });

    // Mascot celebration
    this.mascot.bounce();

    // Particles from target text
    this._emitParticles(this.targetText.x, this.targetText.y);

    // Notify React (for XP)
    this._onScore({ correct: true, item, transcript, score: this.score, streak: this.streak });

    // Card flash green
    this._drawCard(0xd1fae5, 0x10b981);

    // Next item
    this.time.delayedCall(1800, () => {
      this.currentIndex++;
      this._showItem();
    });
  }

  _handleWrong(item, transcript) {
    this.streak = 0;
    this.attempts++;
    this.streakText.setText('🔥 0');

    // Feedback — show what was heard
    const heardMsg = transcript ? `(Heard: "${transcript}")` : '(No speech detected)';
    this.feedbackText
      .setText(`❌ Cuba lagi! ${heardMsg}`)
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
    this._drawCard(0xffe4e6, 0xf43f5e);

    // Notify React
    this._onScore({ correct: false, item, transcript, score: this.score, streak: this.streak });

    // Retry after delay
    this.time.delayedCall(1500, () => {
      this._drawCard(0xffffff, 0x0ea5e9);

      if (this.attempts >= 3) {
        // Skip to next after 3 failed attempts
        this.feedbackText.setText(`Jawapan: ${item.text}`).setColor('#7c3aed').setAlpha(1);
        this.time.delayedCall(1500, () => {
          this.currentIndex++;
          this._showItem();
        });
      } else {
        // Retry same item
        if (this._isMobile) {
          // Show tap button again
          this.tapBtnContainer.setVisible(true);
          this.feedbackText.setText('🎤 Tap to try again').setColor('#0ea5e9').setAlpha(1);
        } else {
          this._showItem(); // Auto-retry on desktop
        }
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
    this.tapBtnContainer.setVisible(false);
    this.feedbackText.setAlpha(0);

    // Celebration screen
    const overlay = this.add.graphics();
    overlay.fillStyle(0xf0f9ff, 0.95);
    overlay.fillRect(0, 0, width, height);

    this.add
      .text(width / 2, height * 0.15, '🎉', { fontSize: '56px' })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height * 0.28, 'Tahniah! / Well Done!', {
        fontFamily: '"Fredoka One", cursive',
        fontSize: '22px',
        color: '#7c3aed',
        align: 'center',
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height * 0.38, `Skor Anda: ${this.score} / ${this.items.length}`, {
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

    const playBtn = this.add.container(width / 2, height * 0.54);
    const playBg = this.add.graphics();
    playBg.fillStyle(0x0ea5e9, 1);
    playBg.fillRoundedRect(-btnW / 2, -btnH / 2, btnW, btnH, 24);
    const playText = this.add
      .text(0, 0, '🔄 Main Lagi', {
        fontFamily: '"Fredoka One", cursive',
        fontSize: '16px',
        color: '#ffffff',
      })
      .setOrigin(0.5);
    playBtn.add([playBg, playText]);
    playBtn.setSize(btnW, btnH);
    playBtn.setInteractive({ useHandCursor: true });
    playBtn.on('pointerdown', () => {
      this.scene.restart({
        category: this.category,
        onScore: this._onScore,
        onTranscriptUpdate: this._onTranscriptUpdate,
      });
    });

    // Menu button
    const menuBtn = this.add.container(width / 2, height * 0.66);
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
    menuBtn.add([menuBg, menuText]);
    menuBtn.setSize(btnW, btnH);
    menuBtn.setInteractive({ useHandCursor: true });
    menuBtn.on('pointerdown', () => {
      this.game.destroy(true);
    });

    // Particles
    this._emitParticles(width / 2, height * 0.2);
    this.time.delayedCall(200, () => this._emitParticles(width * 0.3, height * 0.25));
    this.time.delayedCall(400, () => this._emitParticles(width * 0.7, height * 0.25));
  }

  // ── Cleanup ─────────────────────────────────────────────────────────────────

  shutdown() {
    SpeechManager.stop();
    SpeechManager.stopSpeaking();
    SpeechManager.onTranscript(null);
  }
}
