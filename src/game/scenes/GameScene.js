/**
 * GameScene — Icon-to-Speech Bilingual Quiz Engine
 *
 * The user sees an SVG icon, toggles BM/EN, and speaks the answer.
 *
 * Features:
 *  - Language toggle (BM ↔ EN) with instant TTS/recognition switch
 *  - SVG icon rendering via off-screen canvas → Phaser texture
 *  - Bilingual speech validation with cross-language feedback
 *  - Floating icon animation, mascot feedback, particles
 *  - Responsive layout for phones
 */
import Phaser from 'phaser';
import MascotSprite from '../sprites/MascotSprite';
import { CURRICULUM, getShuffledItems, checkBilingualMatch, getIcon } from '../../data/curriculum/index';
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

    // ── Language state ─────────────────────────────────────────────────────
    this.currentLang = 'ms'; // default to BM

    // Items queue — limit large categories to 10 items
    const limit = ['numbers', 'common_objects', 'en_long_vowels'].includes(this.category) ? 10 : 0;
    this.items = getShuffledItems(this.category, limit);
    this.currentIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.attempts = 0;
    this._isMobile = SpeechManager.isMobile();
    this._iconTextureKeys = []; // track created textures for cleanup

    // ─── Responsive layout ──────────────────────────────────────────────────
    const isSmall = height < 500 || width < 380;
    this._layout = {
      headerY: 12,
      iconY: isSmall ? height * 0.28 : height * 0.25,
      iconSize: isSmall ? 80 : 100,
      promptY: isSmall ? height * 0.44 : height * 0.42,
      earY: isSmall ? height * 0.56 : height * 0.53,
      tapBtnY: isSmall ? height * 0.58 : height * 0.55,
      feedbackY: isSmall ? height * 0.72 : height * 0.67,
      mascotY: isSmall ? height * 0.87 : height * 0.84,
      promptFontSize: isSmall ? '12px' : '14px',
    };

    // Background
    this.cameras.main.setBackgroundColor(0xf0f9ff);

    // ─── UI: Header ─────────────────────────────────────────────────────────
    this.streakText = this.add
      .text(width - 16, this._layout.headerY, '🔥 0', {
        fontFamily: '"Nunito", sans-serif',
        fontSize: isSmall ? '12px' : '14px',
        color: '#ef4444',
        fontStyle: 'bold',
      })
      .setOrigin(1, 0);

    this.scoreText = this.add
      .text(width - (isSmall ? 60 : 70), this._layout.headerY, '⭐ 0', {
        fontFamily: '"Fredoka One", cursive',
        fontSize: isSmall ? '13px' : '15px',
        color: '#f59e0b',
      })
      .setOrigin(1, 0);

    this.add
      .text(width / 2, this._layout.headerY, this._getCategoryLabel(), {
        fontFamily: '"Fredoka One", cursive',
        fontSize: isSmall ? '11px' : '13px',
        color: '#64748b',
      })
      .setOrigin(0.5, 0);

    // ─── Language Toggle ────────────────────────────────────────────────────
    this._createLangToggle(width, isSmall);

    // ─── Icon area (card background) ───────────────────────────────────────
    const cardW = Math.min(width - 40, 340);
    const cardH = this._layout.iconSize + 40;
    this.card = this.add.graphics();
    this._drawCard(0xffffff, 0x0ea5e9);

    // Icon sprite placeholder — will be set per item
    this.iconSprite = null;

    // ─── Prompt text ────────────────────────────────────────────────────────
    this.promptText = this.add
      .text(width / 2, this._layout.promptY, '', {
        fontFamily: '"Nunito", sans-serif',
        fontSize: this._layout.promptFontSize,
        color: '#64748b',
        align: 'center',
        fontStyle: 'bold',
        wordWrap: { width: width - 40 },
      })
      .setOrigin(0.5, 0);

    // ─── Pulsing Ear / Mic ──────────────────────────────────────────────────
    const earY = this._layout.earY;
    this.pulseRing1 = this.add.circle(width / 2, earY, 38, 0x0ea5e9, 0.15);
    this.pulseRing2 = this.add.circle(width / 2, earY, 38, 0x0ea5e9, 0.08);
    this.earBg = this.add.circle(width / 2, earY, 32, 0x0ea5e9, 1);
    this.earText = this.add.text(width / 2, earY, '👂', { fontSize: '28px' }).setOrigin(0.5);
    this.micLabel = this.add
      .text(width / 2, earY + 42, 'Listening...', {
        fontFamily: '"Nunito", sans-serif', fontSize: '12px',
        color: '#0ea5e9', fontStyle: 'bold',
      })
      .setOrigin(0.5, 0);
    this.getReadyText = this.add
      .text(width / 2, earY, '⏳ Get Ready...', {
        fontFamily: '"Fredoka One", cursive', fontSize: '14px', color: '#94a3b8',
      })
      .setOrigin(0.5)
      .setVisible(false);
    this._setMicVisible(false);

    // ─── Tap-to-Speak Button (Mobile) ───────────────────────────────────────
    const tapBtnY = this._layout.tapBtnY;
    const tapBtnW = isSmall ? 160 : 180;
    const tapBtnH = isSmall ? 44 : 50;
    this.tapBtnContainer = this.add.container(width / 2, tapBtnY);
    const tapBg = this.add.graphics();
    tapBg.fillStyle(0x0ea5e9, 1);
    tapBg.fillRoundedRect(-tapBtnW / 2, -tapBtnH / 2, tapBtnW, tapBtnH, 25);
    const tapHighlight = this.add.graphics();
    tapHighlight.fillStyle(0xffffff, 0.2);
    tapHighlight.fillRoundedRect(-tapBtnW / 2, -tapBtnH / 2, tapBtnW, tapBtnH * 0.45, { tl: 25, tr: 25, bl: 0, br: 0 });
    const tapLabel = this.add
      .text(0, 0, '🎤 Tap to Speak', {
        fontFamily: '"Fredoka One", cursive', fontSize: isSmall ? '13px' : '15px', color: '#ffffff',
      })
      .setOrigin(0.5);
    this.tapBtnContainer.add([tapBg, tapHighlight, tapLabel]);
    this.tapBtnContainer.setSize(tapBtnW, tapBtnH);
    this.tapBtnContainer.setInteractive({ useHandCursor: true });
    this.tapBtnContainer.setVisible(false);
    this.tweens.add({ targets: this.tapBtnContainer, scaleX: 1.05, scaleY: 1.05, duration: 800, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    this.tapBtnContainer.on('pointerdown', () => {
      this.tweens.add({ targets: this.tapBtnContainer, scaleX: 0.92, scaleY: 0.92, duration: 80, yoyo: true });
      this.tapBtnContainer.setVisible(false);
      const item = this.items[this.currentIndex];
      if (item) this._startListening(item);
    });

    // ─── Play Controls (Repeat & Skip) ──────────────────────────────────────
    const auxBtnSize = 40;
    
    // Repeat Button (Left side)
    this.repeatBtn = this.add.container(width / 2 - 95, earY);
    const repBg = this.add.circle(0, 0, auxBtnSize / 2, 0xffffff);
    repBg.setStrokeStyle(2, 0xe2e8f0);
    const repIcon = this.add.text(0, 0, '🔄', { fontSize: '20px' }).setOrigin(0.5);
    this.repeatBtn.add([repBg, repIcon]);
    this.repeatBtn.setSize(auxBtnSize, auxBtnSize).setInteractive({ useHandCursor: true });
    this.repeatBtn.on('pointerdown', () => this._repeatPrompt());
    this.repeatBtn.setVisible(false);

    // Skip Button (Right side)
    this.skipBtn = this.add.container(width / 2 + 95, earY);
    const skipBg = this.add.circle(0, 0, auxBtnSize / 2, 0xffffff);
    skipBg.setStrokeStyle(2, 0xe2e8f0);
    const skipIcon = this.add.text(0, 0, '⏭️', { fontSize: '20px' }).setOrigin(0.5);
    this.skipBtn.add([skipBg, skipIcon]);
    this.skipBtn.setSize(auxBtnSize, auxBtnSize).setInteractive({ useHandCursor: true });
    this.skipBtn.on('pointerdown', () => this._handleSkip());
    this.skipBtn.setVisible(false);

    // ─── Feedback ───────────────────────────────────────────────────────────
    this.feedbackText = this.add
      .text(width / 2, this._layout.feedbackY, '', {
        fontFamily: '"Fredoka One", cursive', fontSize: isSmall ? '15px' : '18px',
        color: '#10b981', align: 'center', wordWrap: { width: width - 40 },
      })
      .setOrigin(0.5)
      .setAlpha(0);

    // ─── Mascot ─────────────────────────────────────────────────────────────
    this.mascot = new MascotSprite(this, width * 0.82, this._layout.mascotY, Math.min(30, width * 0.07));

    // ─── Progress bar ───────────────────────────────────────────────────────
    this.progressBg = this.add.graphics();
    this.progressFill = this.add.graphics();
    this.progressLabel = this.add
      .text(width / 2, height - 14, '', {
        fontFamily: '"Nunito", sans-serif', fontSize: '11px', color: '#94a3b8', fontStyle: 'bold',
      })
      .setOrigin(0.5, 1);
    this._drawProgress();

    // ─── Particles ──────────────────────────────────────────────────────────
    this._setupParticles();

    // ─── Transcript listener ────────────────────────────────────────────────
    SpeechManager.onTranscript((data) => {
      if (data && data.micActive === true) this._showRecordingState();
      this._onTranscriptUpdate(data);
    });

    // ─── Start ──────────────────────────────────────────────────────────────
    this.time.delayedCall(600, () => this._showItem());
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  LANGUAGE TOGGLE
  // ═══════════════════════════════════════════════════════════════════════════

  _createLangToggle(width, isSmall) {
    const y = this._layout.headerY + 12;
    const btnW = 40, btnH = 24, gap = 2;
    const totalW = btnW * 2 + gap;
    const x = 16 + totalW / 2;

    this.langToggleContainer = this.add.container(x, y);

    // BM button
    this.langBmBg = this.add.graphics();
    this.langBmText = this.add.text(-btnW / 2 - gap / 2, 0, 'BM', {
      fontFamily: '"Fredoka One", cursive', fontSize: '11px', color: '#ffffff',
    }).setOrigin(0.5);

    // EN button
    this.langEnBg = this.add.graphics();
    this.langEnText = this.add.text(btnW / 2 + gap / 2, 0, 'EN', {
      fontFamily: '"Fredoka One", cursive', fontSize: '11px', color: '#64748b',
    }).setOrigin(0.5);

    this.langToggleContainer.add([this.langBmBg, this.langEnBg, this.langBmText, this.langEnText]);
    this._drawLangToggle();

    // Hitbox for BM
    const bmHit = this.add.rectangle(-btnW / 2 - gap / 2, 0, btnW, btnH, 0x000000, 0)
      .setInteractive({ useHandCursor: true });
    bmHit.on('pointerdown', () => this._switchLang('ms'));
    this.langToggleContainer.add(bmHit);

    // Hitbox for EN
    const enHit = this.add.rectangle(btnW / 2 + gap / 2, 0, btnW, btnH, 0x000000, 0)
      .setInteractive({ useHandCursor: true });
    enHit.on('pointerdown', () => this._switchLang('en'));
    this.langToggleContainer.add(enHit);
  }

  _drawLangToggle() {
    const btnW = 40, btnH = 24, gap = 2, r = 12;
    this.langBmBg.clear();
    this.langEnBg.clear();

    if (this.currentLang === 'ms') {
      this.langBmBg.fillStyle(0x0ea5e9, 1);
      this.langBmBg.fillRoundedRect(-btnW - gap / 2, -btnH / 2, btnW, btnH, { tl: r, bl: r, tr: 0, br: 0 });
      this.langEnBg.fillStyle(0xe2e8f0, 1);
      this.langEnBg.fillRoundedRect(gap / 2, -btnH / 2, btnW, btnH, { tl: 0, bl: 0, tr: r, br: r });
      this.langBmText.setColor('#ffffff');
      this.langEnText.setColor('#64748b');
    } else {
      this.langBmBg.fillStyle(0xe2e8f0, 1);
      this.langBmBg.fillRoundedRect(-btnW - gap / 2, -btnH / 2, btnW, btnH, { tl: r, bl: r, tr: 0, br: 0 });
      this.langEnBg.fillStyle(0x0ea5e9, 1);
      this.langEnBg.fillRoundedRect(gap / 2, -btnH / 2, btnW, btnH, { tl: 0, bl: 0, tr: r, br: r });
      this.langBmText.setColor('#64748b');
      this.langEnText.setColor('#ffffff');
    }
  }

  _switchLang(lang) {
    if (this.currentLang === lang) return;
    this.currentLang = lang;
    this._drawLangToggle();

    // Stop any ongoing speech/listening
    SpeechManager.stop();
    SpeechManager.stopSpeaking();

    // Update prompt for current item
    const item = this.items[this.currentIndex];
    if (item && item[lang]) {
      this.promptText.setText(item[lang].prompt);
      // Re-speak with new language
      const ttsLang = lang === 'ms' ? 'ms-MY' : 'en-US';
      if (SpeechManager.isTTSSupported()) {
        SpeechManager.speak(item[lang].prompt, ttsLang);
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  SVG ICON RENDERING
  // ═══════════════════════════════════════════════════════════════════════════

  _renderIcon(iconKey) {
    const { width } = this.scale;
    const size = this._layout.iconSize;
    const texKey = `icon_${iconKey}_${size}`;

    // Destroy previous icon sprite
    if (this.iconSprite) {
      this.tweens.killTweensOf(this.iconSprite);
      this.iconSprite.destroy();
      this.iconSprite = null;
    }

    // Check if texture already exists
    if (this.textures.exists(texKey)) {
      this._createIconSprite(texKey);
      return;
    }

    // Render SVG to off-screen canvas
    const svgString = getIcon(iconKey, { size, color: '#1e1b4b' });
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size);
      if (!this.textures.exists(texKey)) {
        this.textures.addCanvas(texKey, canvas);
        this._iconTextureKeys.push(texKey);
      }
      this._createIconSprite(texKey);
    };
    img.onerror = () => {
      // Fallback: draw a placeholder circle
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2 - 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#94a3b8';
      ctx.font = `${size * 0.4}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('?', size / 2, size / 2);
      if (!this.textures.exists(texKey)) {
        this.textures.addCanvas(texKey, canvas);
        this._iconTextureKeys.push(texKey);
      }
      this._createIconSprite(texKey);
    };
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
  }

  _createIconSprite(texKey) {
    const { width } = this.scale;
    this.iconSprite = this.add.image(width / 2, this._layout.iconY, texKey);
    this.iconSprite.setScale(0.5).setAlpha(0);

    // Pop-in animation
    this.tweens.add({
      targets: this.iconSprite,
      scaleX: 1, scaleY: 1, alpha: 1,
      duration: 350, ease: 'Back.easeOut',
      onComplete: () => {
        // Floating animation
        this.tweens.add({
          targets: this.iconSprite,
          y: this._layout.iconY + 10,
          duration: 1500,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut',
        });
      },
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  HELPERS
  // ═══════════════════════════════════════════════════════════════════════════

  _getCategoryLabel() {
    const labels = {
      bm_kv: '🇲🇾 Suku Kata KV',
      bm_kvk: '🇲🇾 Suku Kata KVK',
      en_long_vowels: '🇬🇧 Long Vowels',
      numbers: '🔢 Numbers 1–100',
      common_objects: '🎯 Common Objects',
    };
    return labels[this.category] || this.category;
  }

  _drawCard(fill, stroke) {
    const { width } = this.scale;
    const cardW = Math.min(width - 40, 340);
    const cardH = this._layout.iconSize + 40;
    const cardY = this._layout.iconY;
    this.card.clear();
    this.card.fillStyle(fill, 0.92);
    this.card.fillRoundedRect(width / 2 - cardW / 2, cardY - cardH / 2, cardW, cardH, 20);
    this.card.lineStyle(3, stroke, 0.3);
    this.card.strokeRoundedRect(width / 2 - cardW / 2, cardY - cardH / 2, cardW, cardH, 20);
  }

  _setMicVisible(val) {
    [this.pulseRing1, this.pulseRing2, this.earBg, this.earText, this.micLabel].forEach(o => o.setVisible(val));
    if (this.getReadyText) this.getReadyText.setVisible(false);
    if (val) {
      this.micLabel.setText('Listening...');
      this.micLabel.setColor('#0ea5e9');
      this.earBg.setFillStyle(0x0ea5e9, 1);
      this.tweens.add({ targets: this.pulseRing1, scaleX: 1.8, scaleY: 1.8, alpha: 0, duration: 1200, repeat: -1, ease: 'Sine.easeOut' });
      this.tweens.add({ targets: this.pulseRing2, scaleX: 2.2, scaleY: 2.2, alpha: 0, duration: 1500, delay: 300, repeat: -1, ease: 'Sine.easeOut' });
    } else {
      this.tweens.killTweensOf(this.pulseRing1);
      this.tweens.killTweensOf(this.pulseRing2);
      this.pulseRing1.setScale(1).setAlpha(0.15);
      this.pulseRing2.setScale(1).setAlpha(0.08);
    }
  }

  _showRecordingState() {
    if (!this.micLabel || !this.micLabel.visible) return;
    this.micLabel.setText('🔴 Recording');
    this.micLabel.setColor('#ef4444');
    this.earBg.setFillStyle(0xef4444, 1);
    this.earText.setText('🎤');
    this.tweens.add({ targets: this.earBg, scaleX: 1.15, scaleY: 1.15, duration: 400, yoyo: true, repeat: 2, ease: 'Sine.easeInOut' });
  }

  _drawProgress() {
    const { width, height } = this.scale;
    const barW = Math.min(width - 60, 300), barH = 8;
    const barX = (width - barW) / 2, barY = height - 32;
    this.progressBg.clear();
    this.progressBg.fillStyle(0xe2e8f0, 1);
    this.progressBg.fillRoundedRect(barX, barY, barW, barH, 4);
    const progress = this.items.length > 0 ? Math.min(this.currentIndex / this.items.length, 1) : 0;
    this.progressFill.clear();
    if (progress > 0) {
      this.progressFill.fillStyle(0x0ea5e9, 1);
      this.progressFill.fillRoundedRect(barX, barY, barW * progress, barH, 4);
    }
    this.progressLabel.setText(`${Math.min(this.currentIndex + 1, this.items.length)} / ${this.items.length}`);
  }

  _setupParticles() {
    const gfx = this.add.graphics();
    gfx.fillStyle(0xfbbf24, 1);
    gfx.fillCircle(8, 8, 8);
    gfx.generateTexture('particle_star', 16, 16);
    gfx.destroy();
    const gfx2 = this.add.graphics();
    gfx2.fillStyle(0xffffff, 1);
    gfx2.fillRect(0, 0, 10, 10);
    gfx2.generateTexture('particle_confetti', 10, 10);
    gfx2.destroy();
    this.emitter = this.add.particles(0, 0, 'particle_star', {
      speed: { min: 100, max: 250 }, angle: { min: 220, max: 320 },
      scale: { start: 0.6, end: 0 }, lifespan: 800, gravityY: 300,
      quantity: 0, emitting: false,
      tint: [0xfbbf24, 0x0ea5e9, 0xf43f5e, 0x10b981, 0x7c3aed],
    });
  }

  _emitParticles(x, y) {
    this.emitter.setPosition(x, y);
    this.emitter.explode(12);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  GAME FLOW
  // ═══════════════════════════════════════════════════════════════════════════

  async _showItem() {
    if (this.currentIndex >= this.items.length) {
      this._showComplete();
      return;
    }

    const item = this.items[this.currentIndex];
    this.attempts = 0;

    // Render the SVG icon
    this._renderIcon(item.icon);

    // Update prompt for current language
    const langData = item[this.currentLang];
    this.promptText.setText(langData ? langData.prompt : '');
    this.feedbackText.setAlpha(0);
    this.tapBtnContainer.setVisible(false);
    this.repeatBtn.setVisible(true);
    this.skipBtn.setVisible(true);
    this._drawProgress();
    this._drawCard(0xffffff, 0x0ea5e9);

    // TTS speaks the prompt
    const ttsLang = this.currentLang === 'ms' ? 'ms-MY' : 'en-US';
    if (SpeechManager.isTTSSupported() && langData) {
      await SpeechManager.speak(langData.prompt, ttsLang);
    }

    // Mic gate
    const gateDelay = this._isMobile ? 600 : 300;
    if (!this._isMobile) {
      this.getReadyText.setVisible(true).setAlpha(0);
      this.tweens.add({ targets: this.getReadyText, alpha: 1, duration: 200 });
    }

    this.time.delayedCall(gateDelay, () => {
      if (!this.scene.isActive()) return;
      this.getReadyText.setVisible(false);
      if (this._isMobile) {
        this.tapBtnContainer.setVisible(true).setScale(0.8).setAlpha(0);
        this.tweens.add({ targets: this.tapBtnContainer, scaleX: 1, scaleY: 1, alpha: 1, duration: 300, ease: 'Back.easeOut' });
      } else {
        this._startListening(item);
      }
    });
  }

  _startListening(item) {
    this._setMicVisible(true);
    this.tapBtnContainer.setVisible(false);
    this.earText.setText('👂');
    SpeechManager.stopSpeaking();

    const langData = item[this.currentLang];
    const grammarWords = langData ? [langData.word || langData.syllable || '', ...(langData.matches || [])] : [];
    const recLang = this.currentLang === 'ms' ? 'ms-MY' : 'en-US';

    this._onTranscriptUpdate({
      targetWord: langData?.word || langData?.syllable || '',
      transcript: '', confidence: 0, matchMethod: '', lang: recLang,
    });

    SpeechManager.listen(
      recLang,
      (transcript, confidence, allAlternatives) => {
        this._setMicVisible(false);

        // Bilingual matching
        let matchResult = checkBilingualMatch(item, this.currentLang, transcript, confidence, this._isMobile);

        // Also check alternatives
        if (!matchResult.matched && !matchResult.crossLang && allAlternatives && allAlternatives.length > 1) {
          for (const alt of allAlternatives) {
            const altResult = checkBilingualMatch(item, this.currentLang, alt.transcript, alt.confidence, this._isMobile);
            if (altResult.matched) {
              matchResult = { ...altResult, method: altResult.method + '-alt' };
              break;
            }
            if (altResult.crossLang) {
              matchResult = altResult;
              break;
            }
          }
        }

        this._onTranscriptUpdate({
          targetWord: langData?.word || '', transcript, confidence,
          matchMethod: matchResult.method, matched: matchResult.matched,
          lang: recLang,
        });

        if (matchResult.matched) {
          this._handleCorrect(item, transcript, matchResult.method);
        } else if (matchResult.crossLang) {
          this._handleCrossLang(item, transcript);
        } else {
          this._handleWrong(item, transcript, matchResult.method);
        }
      },
      (error) => {
        this._setMicVisible(false);
        if (this.attempts < 3) {
          if (this._isMobile) {
            this.feedbackText.setText('🎤 Tap again to try').setColor('#64748b').setAlpha(1);
            this.tapBtnContainer.setVisible(true);
          } else {
            this.time.delayedCall(500, () => { if (this.scene.isActive()) this._startListening(item); });
          }
        } else {
          const word = langData?.word || langData?.syllable || '';
          this.feedbackText.setText(`Jawapan: ${word}`).setColor('#7c3aed').setAlpha(1);
          this.time.delayedCall(2000, () => { this.currentIndex++; this._showItem(); });
        }
      },
      { retries: this._isMobile ? 3 : 2, grammarWords }
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  RESULT HANDLERS
  // ═══════════════════════════════════════════════════════════════════════════

  _handleCorrect(item, transcript, method = '') {
    this.score++;
    this.streak++;
    this.attempts = 0;

    // TTS praise
    const ttsLang = this.currentLang === 'ms' ? 'ms-MY' : 'en-US';
    if (SpeechManager.isTTSSupported()) {
      const msPraises = ['Bagus!', 'Hebat!', 'Cemerlang!', 'Bijak!', 'Terbaik!'];
      const enPraises = ['Good job!', 'Excellent!', 'Brilliant!', 'Awesome!', 'Perfect!'];
      const praises = this.currentLang === 'ms' ? msPraises : enPraises;
      SpeechManager.speak(praises[Math.floor(Math.random() * praises.length)], ttsLang);
    }

    this.scoreText.setText(`⭐ ${this.score}`);
    this.streakText.setText(`🔥 ${this.streak}`);
    this.feedbackText.setText('✅ Betul! / Correct!').setColor('#10b981').setAlpha(0).setScale(0.8);
    this.tweens.add({ targets: this.feedbackText, alpha: 1, scaleX: 1, scaleY: 1, duration: 300, ease: 'Back.easeOut' });
    this.mascot.bounce();
    if (this.iconSprite) this._emitParticles(this.iconSprite.x, this.iconSprite.y);
    this._onScore({ correct: true, item, transcript, score: this.score, streak: this.streak, method });
    this._drawCard(0xd1fae5, 0x10b981);
    this.time.delayedCall(1800, () => { this.currentIndex++; this._showItem(); });
  }

  _handleCrossLang(item, transcript) {
    // User said the OTHER language's word — gentle nudge, not wrong
    this.mascot.wobble();

    const isEn = this.currentLang === 'en';
    const nudgeText = isEn
      ? "Itu dalam Bahasa Melayu!\nBoleh sebut dalam English?"
      : "That's in English!\nBoleh sebut dalam Bahasa Melayu?";

    this.feedbackText.setText(`🔄 ${nudgeText}`).setColor('#7c3aed').setAlpha(0);
    this.tweens.add({ targets: this.feedbackText, alpha: 1, duration: 250 });
    this._drawCard(0xede9fe, 0x7c3aed);

    // TTS the nudge
    const ttsLang = this.currentLang === 'ms' ? 'ms-MY' : 'en-US';
    if (SpeechManager.isTTSSupported()) {
      const msg = isEn
        ? "That's Malay! Can you say it in English?"
        : "Itu English! Boleh sebut dalam Bahasa Melayu?";
      SpeechManager.speak(msg, ttsLang);
    }

    // Give another chance after delay
    this.time.delayedCall(2500, () => {
      this._drawCard(0xffffff, 0x0ea5e9);
      if (this._isMobile) {
        this.tapBtnContainer.setVisible(true);
        this.feedbackText.setText('🎤 Tap to try again').setColor('#0ea5e9').setAlpha(1);
      } else {
        if (this.scene.isActive()) this._startListening(item);
      }
    });
  }

  _handleWrong(item, transcript, method = '') {
    this.streak = 0;
    this.attempts++;
    this.streakText.setText('🔥 0');
    const heardMsg = transcript ? `(Heard: "${transcript}")` : '(No speech detected)';
    this.feedbackText.setText(`❌ Cuba lagi! ${heardMsg}`).setColor('#ef4444').setAlpha(0);
    this.tweens.add({ targets: this.feedbackText, alpha: 1, duration: 250 });
    this.mascot.shake();
    this._drawCard(0xffe4e6, 0xf43f5e);
    this._onScore({ correct: false, item, transcript, score: this.score, streak: this.streak, method });

    this.time.delayedCall(1500, () => {
      this._drawCard(0xffffff, 0x0ea5e9);
      if (this.attempts >= 3) {
        const langData = item[this.currentLang];
        const word = langData?.word || langData?.syllable || '';
        this.feedbackText.setText(`Jawapan: ${word}`).setColor('#7c3aed').setAlpha(1);
        this.time.delayedCall(1500, () => { this.currentIndex++; this._showItem(); });
      } else {
        if (this._isMobile) {
          this.tapBtnContainer.setVisible(true);
          this.feedbackText.setText('🎤 Tap to try again').setColor('#0ea5e9').setAlpha(1);
        } else {
          this._showItem();
        }
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  PLAY CONTROLS
  // ═══════════════════════════════════════════════════════════════════════════

  _repeatPrompt() {
    this.tweens.add({ targets: this.repeatBtn, scaleX: 0.9, scaleY: 0.9, duration: 100, yoyo: true });
    const item = this.items[this.currentIndex];
    const langData = item ? item[this.currentLang] : null;
    const ttsLang = this.currentLang === 'ms' ? 'ms-MY' : 'en-US';
    if (SpeechManager.isTTSSupported() && langData) {
      SpeechManager.speak(langData.prompt, ttsLang);
    }
  }

  _handleSkip() {
    this.tweens.add({ targets: this.skipBtn, scaleX: 0.9, scaleY: 0.9, duration: 100, yoyo: true });
    SpeechManager.stop();
    this.streak = 0;
    this.streakText.setText('🔥 0');
    
    // Disable mic and hide tap btn while transitioning
    this._setMicVisible(false);
    this.tapBtnContainer.setVisible(false);
    
    this.feedbackText.setText('⏭️ Dilangkau / Skipped').setColor('#64748b').setAlpha(0);
    this.tweens.add({ targets: this.feedbackText, alpha: 1, duration: 250 });
    this._drawCard(0xf1f5f9, 0x64748b);
    
    this.time.delayedCall(800, () => {
      this.currentIndex++;
      this._showItem();
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  COMPLETION
  // ═══════════════════════════════════════════════════════════════════════════

  _showComplete() {
    SpeechManager.stop();
    const { width, height } = this.scale;

    // Hide game UI
    if (this.iconSprite) { this.tweens.killTweensOf(this.iconSprite); this.iconSprite.setVisible(false); }
    this.promptText.setVisible(false);
    this._setMicVisible(false);
    this.tapBtnContainer.setVisible(false);
    if (this.repeatBtn) this.repeatBtn.setVisible(false);
    if (this.skipBtn) this.skipBtn.setVisible(false);
    this.feedbackText.setAlpha(0);

    // TTS celebration
    if (SpeechManager.isTTSSupported()) {
      const isMs = this.currentLang === 'ms';
      SpeechManager.speak(isMs ? 'Tahniah! Anda berjaya!' : 'Congratulations! You did it!', isMs ? 'ms-MY' : 'en-US');
    }

    // Confetti
    const colors = [0xfbbf24, 0x0ea5e9, 0xf43f5e, 0x10b981, 0x7c3aed, 0xec4899];
    const e1 = this.add.particles(width / 2, height * 0.1, 'particle_star', {
      speed: { min: 150, max: 400 }, angle: { min: 200, max: 340 }, scale: { start: 0.8, end: 0 },
      lifespan: { min: 1200, max: 2000 }, gravityY: 200, quantity: 0, emitting: false, tint: colors,
    });
    e1.explode(25);

    // Overlay
    const overlay = this.add.graphics();
    overlay.setAlpha(0);
    this.tweens.add({
      targets: overlay, alpha: 0.95, duration: 500, ease: 'Sine.easeOut',
      onUpdate: () => { overlay.clear(); overlay.fillStyle(0xf0f9ff, overlay.alpha); overlay.fillRect(0, 0, width, height); },
    });

    // Emoji + title
    const emoji = this.add.text(width / 2, height * 0.13, '🎉', { fontSize: '56px' }).setOrigin(0.5).setScale(0).setAlpha(0);
    this.time.delayedCall(300, () => {
      this.tweens.add({ targets: emoji, scaleX: 1.3, scaleY: 1.3, alpha: 1, duration: 400, ease: 'Back.easeOut' });
    });

    const title = this.add.text(width / 2, height * 0.28, 'Tahniah! / Well Done!', {
      fontFamily: '"Fredoka One", cursive', fontSize: '22px', color: '#7c3aed', align: 'center',
    }).setOrigin(0.5).setAlpha(0);
    this.time.delayedCall(500, () => { this.tweens.add({ targets: title, alpha: 1, scaleX: 1, scaleY: 1, duration: 400, ease: 'Back.easeOut' }); });

    // Score
    const scoreLabel = this.add.text(width / 2, height * 0.38, `Skor: 0 / ${this.items.length}`, {
      fontFamily: '"Nunito", sans-serif', fontSize: '18px', color: '#1e1b4b', fontStyle: 'bold', align: 'center',
    }).setOrigin(0.5).setAlpha(0);
    this.time.delayedCall(700, () => {
      scoreLabel.setAlpha(1);
      const counter = { val: 0 };
      this.tweens.add({
        targets: counter, val: this.score, duration: 800, ease: 'Sine.easeOut',
        onUpdate: () => scoreLabel.setText(`Skor: ${Math.round(counter.val)} / ${this.items.length}`),
      });
    });

    // Stars
    const starCount = this.score >= this.items.length ? 3 : this.score >= this.items.length * 0.7 ? 2 : this.score >= this.items.length * 0.4 ? 1 : 0;
    if (starCount > 0) {
      this.time.delayedCall(1200, () => {
        const stars = this.add.text(width / 2, height * 0.46, '⭐'.repeat(starCount), { fontSize: '32px' }).setOrigin(0.5).setScale(0).setAlpha(0);
        this.tweens.add({ targets: stars, scaleX: 1.2, scaleY: 1.2, alpha: 1, duration: 400, ease: 'Back.easeOut' });
      });
    }

    // Buttons
    const btnW = 200, btnH = 48;
    this.time.delayedCall(1500, () => {
      // Play Again
      const playBtn = this.add.container(width / 2, height * 0.58);
      const pBg = this.add.graphics(); pBg.fillStyle(0x0ea5e9, 1); pBg.fillRoundedRect(-btnW / 2, -btnH / 2, btnW, btnH, 24);
      const pTxt = this.add.text(0, 0, '🔄 Main Lagi', { fontFamily: '"Fredoka One", cursive', fontSize: '16px', color: '#fff' }).setOrigin(0.5);
      playBtn.add([pBg, pTxt]).setSize(btnW, btnH).setInteractive({ useHandCursor: true }).setScale(0).setAlpha(0);
      this.tweens.add({ targets: playBtn, scaleX: 1, scaleY: 1, alpha: 1, duration: 350, ease: 'Back.easeOut' });
      playBtn.on('pointerdown', () => this.scene.restart({ category: this.category, onScore: this._onScore, onTranscriptUpdate: this._onTranscriptUpdate }));

      // Menu
      const menuBtn = this.add.container(width / 2, height * 0.70);
      const mBg = this.add.graphics(); mBg.fillStyle(0x7c3aed, 1); mBg.fillRoundedRect(-btnW / 2, -btnH / 2, btnW, btnH, 24);
      const mTxt = this.add.text(0, 0, '🏠 Menu Utama', { fontFamily: '"Fredoka One", cursive', fontSize: '16px', color: '#fff' }).setOrigin(0.5);
      menuBtn.add([mBg, mTxt]).setSize(btnW, btnH).setInteractive({ useHandCursor: true }).setScale(0).setAlpha(0);
      this.tweens.add({ targets: menuBtn, scaleX: 1, scaleY: 1, alpha: 1, duration: 350, ease: 'Back.easeOut', delay: 150 });
      menuBtn.on('pointerdown', () => this.game.destroy(true));
    });
  }

  // ── Cleanup ─────────────────────────────────────────────────────────────────
  shutdown() {
    SpeechManager.stop();
    SpeechManager.stopSpeaking();
    SpeechManager.onTranscript(null);
  }
}
