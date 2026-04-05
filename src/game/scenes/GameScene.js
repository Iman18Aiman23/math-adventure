/**
 * GameScene — The main "Speak-to-Play" game loop.
 *
 * Cross-platform design:
 *  - Desktop: Auto-listen after TTS prompt
 *  - Mobile: "Tap to Speak" button (user gesture required for mic)
 *  - Retry on no-speech for both platforms
 *  - Visual feedback: pulsing ear, mascot bounce/shake, particles
 *  - Level-complete "juice": applause SFX + confetti celebration
 *  - Responsive layout for small phone screens
 *  - Phonetic Engine: 5-stage matching with consonant swap bridge
 *  - 300ms mic gate: prevents early speech capture
 *  - JSGF Grammar: curriculum word prioritization
 */
import Phaser from 'phaser';
import MascotSprite from '../sprites/MascotSprite';
import { CURRICULUM, getShuffled, checkSpeechMatch, checkSpeechMatchDetailed, registerPhoneticHelper } from '../../data/curriculum';
import SpeechManager from '../../services/SpeechManager';
import PhoneticHelper from '../../utils/PhoneticHelper';

// Register PhoneticHelper globally so curriculum.js can access it
registerPhoneticHelper(PhoneticHelper);

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

    // ─── Responsive layout calculations ──────────────────────────────────────
    // Adjust positions based on screen dimensions to prevent overlap on phones
    const isSmallScreen = height < 500 || width < 380;
    this._layout = {
      headerY: 12,
      cardY: isSmallScreen ? height * 0.26 : height * 0.22,
      cardH: isSmallScreen ? 80 : 100,
      cardW: Math.min(width - 40, 340),
      earY: isSmallScreen ? height * 0.54 : height * 0.50,
      tapBtnY: isSmallScreen ? height * 0.56 : height * 0.52,
      feedbackY: isSmallScreen ? height * 0.72 : height * 0.67,
      mascotY: isSmallScreen ? height * 0.87 : height * 0.84,
      targetFontSize: isSmallScreen
        ? Math.min(42, width * 0.12) + 'px'
        : Math.min(56, width * 0.14) + 'px',
      promptFontSize: isSmallScreen ? '11px' : '13px',
    };

    // Background
    this.cameras.main.setBackgroundColor(0xf0f9ff);

    // ─── UI Elements ────────────────────────────────────────────────────────────
    // (Back button removed)

    // Streak display (far right)
    this.streakText = this.add
      .text(width - 16, this._layout.headerY, '🔥 0', {
        fontFamily: '"Nunito", sans-serif',
        fontSize: isSmallScreen ? '12px' : '14px',
        color: '#ef4444',
        fontStyle: 'bold',
      })
      .setOrigin(1, 0);

    // Score display (to the left of streak)
    this.scoreText = this.add
      .text(width - (isSmallScreen ? 60 : 70), this._layout.headerY, '⭐ 0', {
        fontFamily: '"Fredoka One", cursive',
        fontSize: isSmallScreen ? '13px' : '15px',
        color: '#f59e0b',
      })
      .setOrigin(1, 0);

    // Category label
    this.add
      .text(width / 2, this._layout.headerY, this._getCategoryLabel(), {
        fontFamily: '"Fredoka One", cursive',
        fontSize: isSmallScreen ? '11px' : '13px',
        color: '#64748b',
      })
      .setOrigin(0.5, 0);

    // ─── Target text area ───────────────────────────────────────────────────────
    const { cardY, cardW, cardH } = this._layout;

    this.card = this.add.graphics();
    this._drawCard(0xffffff, 0x0ea5e9);

    // Target text
    this.targetText = this.add
      .text(width / 2, cardY, '', {
        fontFamily: '"Fredoka One", cursive',
        fontSize: this._layout.targetFontSize,
        color: '#1e1b4b',
        align: 'center',
      })
      .setOrigin(0.5);

    // Prompt text
    this.promptText = this.add
      .text(width / 2, cardY + cardH / 2 + 10, '', {
        fontFamily: '"Nunito", sans-serif',
        fontSize: this._layout.promptFontSize,
        color: '#64748b',
        align: 'center',
        fontStyle: 'bold',
      })
      .setOrigin(0.5, 0);

    // ─── Pulsing Ear / Mic Indicator ────────────────────────────────────────────
    const earY = this._layout.earY;

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

    // "Get Ready" indicator — shown during the 300ms gate
    this.getReadyText = this.add
      .text(width / 2, earY, '⏳ Get Ready...', {
        fontFamily: '"Fredoka One", cursive',
        fontSize: '14px',
        color: '#94a3b8',
      })
      .setOrigin(0.5)
      .setVisible(false);

    this._setMicVisible(false);

    // ─── Tap-to-Speak Button (Mobile) ───────────────────────────────────────────
    const tapBtnY = this._layout.tapBtnY;
    const tapBtnW = isSmallScreen ? 160 : 180;
    const tapBtnH = isSmallScreen ? 44 : 50;

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
        fontSize: isSmallScreen ? '13px' : '15px',
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
      .text(width / 2, this._layout.feedbackY, '', {
        fontFamily: '"Fredoka One", cursive',
        fontSize: isSmallScreen ? '15px' : '18px',
        color: '#10b981',
        align: 'center',
        wordWrap: { width: width - 40 },
      })
      .setOrigin(0.5)
      .setAlpha(0);

    // ─── Mascot ─────────────────────────────────────────────────────────────────
    const mascotX = width * 0.82;
    const mascotY = this._layout.mascotY;
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
      // Update recording indicator when mic becomes active
      if (data && data.micActive === true) {
        this._showRecordingState();
      }
      this._onTranscriptUpdate(data);
    });

    // ─── Start ──────────────────────────────────────────────────────────────────
    this.time.delayedCall(600, () => this._showItem());
  }

  // ── Card Drawing Helper ─────────────────────────────────────────────────────

  _drawCard(fill, stroke) {
    const { width } = this.scale;
    const { cardY, cardW, cardH } = this._layout;

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

    // Always hide getReadyText when we toggle mic visibility
    if (this.getReadyText) this.getReadyText.setVisible(false);

    if (val) {
      // Default to 'Listening...' state — will switch to 'Recording' on audiostart
      this.micLabel.setText('Listening...');
      this.micLabel.setColor('#0ea5e9');
      this.earBg.setFillStyle(0x0ea5e9, 1);

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

  /**
   * Switch mic indicator to '🔴 Recording' state.
   * Called when onaudiostart fires (mic is physically capturing).
   */
  _showRecordingState() {
    if (!this.micLabel || !this.micLabel.visible) return;
    this.micLabel.setText('🔴 Recording');
    this.micLabel.setColor('#ef4444');
    this.earBg.setFillStyle(0xef4444, 1);
    this.earText.setText('🎤');

    // Extra pulse for recording state
    this.tweens.add({
      targets: this.earBg,
      scaleX: 1.15, scaleY: 1.15,
      duration: 400,
      yoyo: true,
      repeat: 2,
      ease: 'Sine.easeInOut',
    });
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
    // Star particle
    const gfx = this.add.graphics();
    gfx.fillStyle(0xfbbf24, 1);
    gfx.fillCircle(8, 8, 8);
    gfx.generateTexture('particle_star', 16, 16);
    gfx.destroy();

    // Square confetti particle
    const gfx2 = this.add.graphics();
    gfx2.fillStyle(0xffffff, 1);
    gfx2.fillRect(0, 0, 10, 10);
    gfx2.generateTexture('particle_confetti', 10, 10);
    gfx2.destroy();

    // Tiny circle particle
    const gfx3 = this.add.graphics();
    gfx3.fillStyle(0xffffff, 1);
    gfx3.fillCircle(4, 4, 4);
    gfx3.generateTexture('particle_dot', 8, 8);
    gfx3.destroy();

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

  // ── Celebration Confetti Particles ──────────────────────────────────────────

  _celebrationParticles() {
    const { width, height } = this.scale;
    const colors = [0xfbbf24, 0x0ea5e9, 0xf43f5e, 0x10b981, 0x7c3aed, 0xec4899, 0xf59e0b];

    // Wave 1: Big burst from center top
    const emitter1 = this.add.particles(width / 2, height * 0.1, 'particle_star', {
      speed: { min: 150, max: 400 },
      angle: { min: 200, max: 340 },
      scale: { start: 0.8, end: 0 },
      lifespan: { min: 1200, max: 2000 },
      gravityY: 200,
      quantity: 0,
      emitting: false,
      tint: colors,
      rotate: { min: 0, max: 360 },
    });
    emitter1.explode(25);

    // Wave 2: Confetti squares from sides (delayed)
    this.time.delayedCall(200, () => {
      const emitter2 = this.add.particles(width * 0.15, height * 0.05, 'particle_confetti', {
        speed: { min: 80, max: 300 },
        angle: { min: 250, max: 350 },
        scale: { start: 1.0, end: 0.2 },
        lifespan: { min: 1500, max: 2500 },
        gravityY: 150,
        quantity: 0,
        emitting: false,
        tint: colors,
        rotate: { min: 0, max: 360 },
      });
      emitter2.explode(18);

      const emitter3 = this.add.particles(width * 0.85, height * 0.05, 'particle_confetti', {
        speed: { min: 80, max: 300 },
        angle: { min: 190, max: 290 },
        scale: { start: 1.0, end: 0.2 },
        lifespan: { min: 1500, max: 2500 },
        gravityY: 150,
        quantity: 0,
        emitting: false,
        tint: colors,
        rotate: { min: 0, max: 360 },
      });
      emitter3.explode(18);
    });

    // Wave 3: Small dots raining from top (delayed more)
    this.time.delayedCall(500, () => {
      for (let i = 0; i < 5; i++) {
        this.time.delayedCall(i * 120, () => {
          const x = Phaser.Math.Between(width * 0.1, width * 0.9);
          const emitter4 = this.add.particles(x, -10, 'particle_dot', {
            speed: { min: 50, max: 180 },
            angle: { min: 250, max: 290 },
            scale: { start: 0.8, end: 0 },
            lifespan: { min: 1000, max: 1800 },
            gravityY: 250,
            quantity: 0,
            emitting: false,
            tint: colors,
          });
          emitter4.explode(10);
        });
      }
    });

    // Wave 4: Final big explosion (delayed)
    this.time.delayedCall(800, () => {
      this._emitParticles(width / 2, height * 0.25);
      this._emitParticles(width * 0.3, height * 0.3);
      this._emitParticles(width * 0.7, height * 0.3);
    });
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

    // ─── 300ms MIC GATE ────────────────────────────────────────────────────
    // Children often speak the moment they see a prompt, but the mic takes
    // time to open. We add a visual "Get Ready..." state before recording.
    const gateDelay = this._isMobile ? 600 : 300;

    // Show "Get Ready" indicator during the gate
    if (!this._isMobile) {
      this.getReadyText.setVisible(true);
      this.getReadyText.setAlpha(0);
      this.tweens.add({
        targets: this.getReadyText,
        alpha: 1,
        duration: 200,
      });
    }

    this.time.delayedCall(gateDelay, () => {
      if (!this.scene.isActive()) return;

      // Hide "Get Ready" indicator
      this.getReadyText.setVisible(false);

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
        // DESKTOP: Auto-start listening (gate complete)
        this._startListening(item);
      }
    });
  }

  _startListening(item) {
    this._setMicVisible(true);
    this.tapBtnContainer.setVisible(false);

    // Reset ear icon for new listening session
    this.earText.setText('👂');

    // MOBILE FIX: Explicitly cancel TTS before starting mic
    SpeechManager.stopSpeaking();

    // Build grammar words from the current item's validMatches + target
    const grammarWords = [
      item.text,
      ...(item.validMatches || []),
    ];

    // Send target to DevOverlay
    this._onTranscriptUpdate({
      targetWord: item.text,
      transcript: '',
      confidence: 0,
      matchMethod: '',
      lang: item.lang,
    });

    SpeechManager.listen(
      item.lang,
      // onResult — now receives allAlternatives as 3rd arg
      (transcript, confidence, allAlternatives) => {
        this._setMicVisible(false);

        // Use the Phonetic Engine with confidence gating
        const matchResult = checkSpeechMatchDetailed(
          item, transcript, confidence, this._isMobile
        );

        // Also check all alternatives from the speech API
        // If primary transcript didn't match, maybe an alternative did
        if (!matchResult.matched && allAlternatives && allAlternatives.length > 1) {
          for (const alt of allAlternatives) {
            const altResult = checkSpeechMatchDetailed(
              item, alt.transcript, alt.confidence, this._isMobile
            );
            if (altResult.matched) {
              matchResult.matched = true;
              matchResult.method = altResult.method + '-alt';
              break;
            }
          }
        }

        // Update DevOverlay with match details
        this._onTranscriptUpdate({
          targetWord: item.text,
          transcript,
          confidence,
          matchMethod: matchResult.method,
          matched: matchResult.matched,
          lang: item.lang,
        });

        if (matchResult.matched) {
          this._handleCorrect(item, transcript, matchResult.method);
        } else {
          this._handleWrong(item, transcript, matchResult.method);
        }
      },
      // onError
      (error) => {
        this._setMicVisible(false);
        console.warn('[GameScene] speech error:', error);

        if (this.attempts < 3) {
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
      {
        retries: this._isMobile ? 3 : 2,
        grammarWords,  // JSGF grammar injection
      }
    );
  }

  _handleCorrect(item, transcript, method = '') {
    this.score++;
    this.streak++;
    this.attempts = 0;

    // ─── JUICE: TTS Praise ────────────────────────────────────────────────────
    if (SpeechManager.isTTSSupported()) {
      const msPraises = ['Bagus!', 'Hebat!', 'Cemerlang!', 'Bijak!', 'Terbaik!'];
      const enPraises = ['Good job!', 'Excellent!', 'Brilliant!', 'Awesome!', 'Perfect!'];
      const praises = item.lang === 'ms-MY' ? msPraises : enPraises;
      const praise = praises[Math.floor(Math.random() * praises.length)];
      SpeechManager.speak(praise, item.lang);
    }

    this.scoreText.setText(`⭐ ${this.score}`);
    this.streakText.setText(`🔥 ${this.streak}`);

    // Feedback — show match method in dev-friendly format
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

    // Kancilik celebrate! (mascot celebration)
    this.mascot.bounce();

    // Particles from target text
    this._emitParticles(this.targetText.x, this.targetText.y);

    // Notify React (for XP)
    this._onScore({ correct: true, item, transcript, score: this.score, streak: this.streak, method });

    // Card flash green
    this._drawCard(0xd1fae5, 0x10b981);

    // Next item
    this.time.delayedCall(1800, () => {
      this.currentIndex++;
      this._showItem();
    });
  }

  _handleWrong(item, transcript, method = '') {
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

    // Kancilik encourage! (mascot sad shake)
    this.mascot.shake();

    // Card flash red
    this._drawCard(0xffe4e6, 0xf43f5e);

    // Notify React
    this._onScore({ correct: false, item, transcript, score: this.score, streak: this.streak, method });

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
          this.tapBtnContainer.setVisible(true);
          this.feedbackText.setText('🎤 Tap to try again').setColor('#0ea5e9').setAlpha(1);
        } else {
          this._showItem();
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

    // ─── JUICE: Camera shake ──────────────────────────────────────────────────
    this.cameras.main.shake(400, 0.008);

    // ─── JUICE: TTS Celebration (100% Web Speech API) ─────────────────────────
    if (SpeechManager.isTTSSupported()) {
      const isMs = this.category !== 'en_phonics';
      const text = isMs ? 'Tahniah! Anda berjaya!' : 'Congratulations! You did it!';
      SpeechManager.speak(text, isMs ? 'ms-MY' : 'en-US');
    }

    // ─── JUICE: Confetti celebration particles ────────────────────────────────
    this._celebrationParticles();

    // Celebration screen overlay (fade in)
    const overlay = this.add.graphics();
    overlay.fillStyle(0xf0f9ff, 0);
    overlay.fillRect(0, 0, width, height);
    overlay.setAlpha(0);

    this.tweens.add({
      targets: overlay,
      alpha: 0.95,
      duration: 500,
      ease: 'Sine.easeOut',
      onUpdate: () => {
        overlay.clear();
        overlay.fillStyle(0xf0f9ff, overlay.alpha);
        overlay.fillRect(0, 0, width, height);
      },
    });

    // 🎉 Big emoji — bounce in with delay
    const celebEmoji = this.add
      .text(width / 2, height * 0.13, '🎉', { fontSize: '56px' })
      .setOrigin(0.5)
      .setScale(0)
      .setAlpha(0);

    this.time.delayedCall(300, () => {
      this.tweens.add({
        targets: celebEmoji,
        scaleX: 1.3, scaleY: 1.3, alpha: 1,
        duration: 400, ease: 'Back.easeOut',
        onComplete: () => {
          // Bounce loop
          this.tweens.add({
            targets: celebEmoji,
            scaleX: 1.0, scaleY: 1.0,
            duration: 200, ease: 'Sine.easeInOut',
            onComplete: () => {
              this.tweens.add({
                targets: celebEmoji,
                y: celebEmoji.y - 6,
                duration: 1200,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut',
              });
            },
          });
        },
      });
    });

    // Title — slide in
    const titleText = this.add
      .text(width / 2, height * 0.28, 'Tahniah! / Well Done!', {
        fontFamily: '"Fredoka One", cursive',
        fontSize: '22px',
        color: '#7c3aed',
        align: 'center',
      })
      .setOrigin(0.5)
      .setAlpha(0)
      .setScale(0.5);

    this.time.delayedCall(500, () => {
      this.tweens.add({
        targets: titleText,
        alpha: 1, scaleX: 1, scaleY: 1,
        duration: 400, ease: 'Back.easeOut',
      });
    });

    // Score — count up animation
    const scoreLabel = this.add
      .text(width / 2, height * 0.38, `Skor Anda: 0 / ${this.items.length}`, {
        fontFamily: '"Nunito", sans-serif',
        fontSize: '18px',
        color: '#1e1b4b',
        fontStyle: 'bold',
        align: 'center',
      })
      .setOrigin(0.5)
      .setAlpha(0);

    this.time.delayedCall(700, () => {
      scoreLabel.setAlpha(1);

      // Animated counter
      const counter = { val: 0 };
      this.tweens.add({
        targets: counter,
        val: this.score,
        duration: 800,
        ease: 'Sine.easeOut',
        onUpdate: () => {
          scoreLabel.setText(`Skor Anda: ${Math.round(counter.val)} / ${this.items.length}`);
        },
        onComplete: () => {
          // Pop the score when done counting
          this.tweens.add({
            targets: scoreLabel,
            scaleX: 1.15, scaleY: 1.15,
            duration: 150,
            yoyo: true,
            ease: 'Back.easeOut',
          });
        },
      });
    });

    // Star rating based on score
    const starCount = this.score >= this.items.length ? 3
      : this.score >= this.items.length * 0.7 ? 2
      : this.score >= this.items.length * 0.4 ? 1 : 0;

    if (starCount > 0) {
      this.time.delayedCall(1200, () => {
        const starStr = '⭐'.repeat(starCount);
        const starsText = this.add
          .text(width / 2, height * 0.46, starStr, {
            fontSize: '32px',
            align: 'center',
          })
          .setOrigin(0.5)
          .setScale(0)
          .setAlpha(0);

        this.tweens.add({
          targets: starsText,
          scaleX: 1.2, scaleY: 1.2, alpha: 1,
          duration: 400, ease: 'Back.easeOut',
          onComplete: () => {
            this.tweens.add({
              targets: starsText,
              scaleX: 1.0, scaleY: 1.0,
              duration: 200, ease: 'Sine.easeInOut',
            });
          },
        });
      });
    }

    // Play Again button (delayed entrance)
    const btnW = 200;
    const btnH = 48;

    this.time.delayedCall(1500, () => {
      const playBtn = this.add.container(width / 2, height * 0.58);
      const playBg = this.add.graphics();
      playBg.fillStyle(0x0ea5e9, 1);
      playBg.fillRoundedRect(-btnW / 2, -btnH / 2, btnW, btnH, 24);

      // Glass effect
      const playHighlight = this.add.graphics();
      playHighlight.fillStyle(0xffffff, 0.15);
      playHighlight.fillRoundedRect(-btnW / 2, -btnH / 2, btnW, btnH * 0.45, { tl: 24, tr: 24, bl: 0, br: 0 });

      const playText = this.add
        .text(0, 0, '🔄 Main Lagi', {
          fontFamily: '"Fredoka One", cursive',
          fontSize: '16px',
          color: '#ffffff',
        })
        .setOrigin(0.5);
      playBtn.add([playBg, playHighlight, playText]);
      playBtn.setSize(btnW, btnH);
      playBtn.setInteractive({ useHandCursor: true });
      playBtn.setScale(0).setAlpha(0);

      this.tweens.add({
        targets: playBtn,
        scaleX: 1, scaleY: 1, alpha: 1,
        duration: 350, ease: 'Back.easeOut',
      });

      // Hover pulse
      this.tweens.add({
        targets: playBtn,
        scaleX: 1.04, scaleY: 1.04,
        duration: 800,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
        delay: 400,
      });

      playBtn.on('pointerdown', () => {
        this.scene.restart({
          category: this.category,
          onScore: this._onScore,
          onTranscriptUpdate: this._onTranscriptUpdate,
        });
      });

      // Menu button
      const menuBtn = this.add.container(width / 2, height * 0.70);
      const menuBg = this.add.graphics();
      menuBg.fillStyle(0x7c3aed, 1);
      menuBg.fillRoundedRect(-btnW / 2, -btnH / 2, btnW, btnH, 24);

      const menuHighlight = this.add.graphics();
      menuHighlight.fillStyle(0xffffff, 0.15);
      menuHighlight.fillRoundedRect(-btnW / 2, -btnH / 2, btnW, btnH * 0.45, { tl: 24, tr: 24, bl: 0, br: 0 });

      const menuText = this.add
        .text(0, 0, '🏠 Menu Utama', {
          fontFamily: '"Fredoka One", cursive',
          fontSize: '16px',
          color: '#ffffff',
        })
        .setOrigin(0.5);
      menuBtn.add([menuBg, menuHighlight, menuText]);
      menuBtn.setSize(btnW, btnH);
      menuBtn.setInteractive({ useHandCursor: true });
      menuBtn.setScale(0).setAlpha(0);

      this.tweens.add({
        targets: menuBtn,
        scaleX: 1, scaleY: 1, alpha: 1,
        duration: 350, ease: 'Back.easeOut',
        delay: 150,
      });

      menuBtn.on('pointerdown', () => {
        this.game.destroy(true);
      });
    });
  }

  // ── Cleanup ─────────────────────────────────────────────────────────────────

  shutdown() {
    SpeechManager.stop();
    SpeechManager.stopSpeaking();
    SpeechManager.onTranscript(null);
  }
}
