/**
 * BootScene — Preload / splash screen.
 * Shows a cute loading animation, then transitions to MenuScene.
 */
import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  create() {
    const { width, height } = this.scale;

    // Background colour
    this.cameras.main.setBackgroundColor(0xf0f9ff);

    // Title text
    this.add
      .text(width / 2, height * 0.3, '🎤 AI-Ed Venture', {
        fontFamily: '"Fredoka One", cursive',
        fontSize: Math.min(32, width * 0.08) + 'px',
        color: '#0ea5e9',
        align: 'center',
      })
      .setOrigin(0.5);

    // Loading dots animation
    const dots = this.add
      .text(width / 2, height * 0.5, '● ● ●', {
        fontFamily: '"Nunito", sans-serif',
        fontSize: '24px',
        color: '#7c3aed',
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: dots,
      alpha: 0.3,
      duration: 600,
      yoyo: true,
      repeat: 2,
      ease: 'Sine.easeInOut',
      onComplete: () => {
        this.scene.start('MenuScene', this._initData);
      },
    });

    // Subtitle
    this.add
      .text(width / 2, height * 0.65, 'Speak to Play!', {
        fontFamily: '"Nunito", sans-serif',
        fontSize: '16px',
        color: '#64748b',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    // Store init data passed from React
    this._initData = this.scene.settings.data || {};
  }
}
