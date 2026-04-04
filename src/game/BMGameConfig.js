/**
 * BMGameConfig — Phaser 3 configuration factory.
 *
 * Returns a Phaser.Types.Core.GameConfig targeting a DOM container.
 */
import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import MenuScene from './scenes/MenuScene';
import GameScene from './scenes/GameScene';

/**
 * Create a Phaser game that skips the menu and goes directly to
 * the GameScene for the chosen category.
 *
 * @param {HTMLDivElement} parent – DOM element to render into
 * @param {string} category – curriculum category key
 * @param {object} callbacks – { onScore, onTranscriptUpdate }
 * @returns {Phaser.Game}
 */
export function createBMGame(parent, category, callbacks = {}) {
  const width = Math.min(parent.clientWidth || 480, 480);
  const height = Math.min(parent.clientHeight || 600, 640);

  // Direct-launch scene that skips boot/menu and goes to GameScene
  class DirectLaunchScene extends Phaser.Scene {
    constructor() {
      super({ key: 'DirectLaunchScene' });
    }
    create() {
      const { width: w, height: h } = this.scale;
      this.cameras.main.setBackgroundColor(0xf0f9ff);

      const dots = this.add
        .text(w / 2, h / 2, '● ● ●', {
          fontFamily: '"Nunito", sans-serif',
          fontSize: '24px',
          color: '#7c3aed',
        })
        .setOrigin(0.5);

      this.tweens.add({
        targets: dots,
        alpha: 0.3,
        duration: 400,
        yoyo: true,
        repeat: 1,
        ease: 'Sine.easeInOut',
        onComplete: () => {
          this.scene.start('GameScene', {
            category: category,
            onScore: callbacks.onScore || (() => {}),
            onTranscriptUpdate: callbacks.onTranscriptUpdate || (() => {}),
          });
        },
      });
    }
  }

  const config = {
    type: Phaser.AUTO,
    parent,
    width,
    height,
    backgroundColor: '#f0f9ff',
    transparent: false,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [DirectLaunchScene, GameScene, MenuScene, BootScene],
    render: {
      pixelArt: false,
      antialias: true,
    },
  };

  const game = new Phaser.Game(config);
  return game;
}
