/**
 * MenuScene — Language / category selection screen inside Phaser.
 *
 * Lets the child choose: BM Suku Kata KV | BM Suku Kata KVK | English | Math
 */
import Phaser from 'phaser';
import MascotSprite from '../sprites/MascotSprite';

const CATEGORIES = [
  { key: 'bm_kv',      emoji: '🇲🇾', label: 'Suku Kata KV',  color: 0x0ea5e9, desc: 'ba · bi · bu · be · bo'  },
  { key: 'bm_kvk',     emoji: '🇲🇾', label: 'Suku Kata KVK', color: 0x7c3aed, desc: 'ban · bin · bun · ben · bon' },
  { key: 'en_phonics',  emoji: '🇬🇧', label: 'English Phonics', color: 0xf43f5e, desc: 'Lake · Kite · Rope · Tune' },
  { key: 'math',        emoji: '🔢', label: 'Math 1-100',    color: 0xf59e0b, desc: 'Speak the numbers!' },
];

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create(data) {
    const { width, height } = this.scale;
    this._callbacks = data || {};

    this.cameras.main.setBackgroundColor(0xf0f9ff);

    // Title
    this.add
      .text(width / 2, 30, '🎤 Pilih Kategori', {
        fontFamily: '"Fredoka One", cursive',
        fontSize: Math.min(26, width * 0.065) + 'px',
        color: '#1e1b4b',
        align: 'center',
      })
      .setOrigin(0.5, 0);

    // Category buttons
    const btnWidth = Math.min(width - 40, 340);
    const btnHeight = 58;
    const startY = 80;
    const gap = 12;

    CATEGORIES.forEach((cat, i) => {
      const yPos = startY + i * (btnHeight + gap);
      this._createButton(width / 2, yPos, btnWidth, btnHeight, cat);
    });

    // Mascot at bottom
    const mascotY = startY + CATEGORIES.length * (btnHeight + gap) + 40;
    if (mascotY + 60 < height) {
      this.mascot = new MascotSprite(this, width / 2, mascotY, 35);
    }
  }

  _createButton(x, y, w, h, cat) {
    const container = this.add.container(x, y);

    // Button background
    const bg = this.add.graphics();
    bg.fillStyle(cat.color, 1);
    bg.fillRoundedRect(-w / 2, -h / 2, w, h, 16);

    // Slight overlay for depth
    const overlay = this.add.graphics();
    overlay.fillStyle(0xffffff, 0.15);
    overlay.fillRoundedRect(-w / 2, -h / 2, w, h * 0.5, { tl: 16, tr: 16, bl: 0, br: 0 });

    // Emoji
    const emoji = this.add
      .text(-w / 2 + 18, 0, cat.emoji, {
        fontSize: '22px',
      })
      .setOrigin(0, 0.5);

    // Label
    const label = this.add
      .text(-w / 2 + 52, -6, cat.label, {
        fontFamily: '"Fredoka One", cursive',
        fontSize: '15px',
        color: '#ffffff',
      })
      .setOrigin(0, 0.5);

    // Description
    const desc = this.add
      .text(-w / 2 + 52, 12, cat.desc, {
        fontFamily: '"Nunito", sans-serif',
        fontSize: '11px',
        color: 'rgba(255,255,255,0.85)',
      })
      .setOrigin(0, 0.5);

    // Arrow
    const arrow = this.add
      .text(w / 2 - 18, 0, '▶', {
        fontSize: '14px',
        color: '#ffffff',
      })
      .setOrigin(0.5, 0.5);

    container.add([bg, overlay, emoji, label, desc, arrow]);
    container.setSize(w, h);
    container.setInteractive({ useHandCursor: true });

    // Hover effect
    container.on('pointerover', () => {
      this.tweens.add({ targets: container, scaleX: 1.04, scaleY: 1.04, duration: 120, ease: 'Back.easeOut' });
    });
    container.on('pointerout', () => {
      this.tweens.add({ targets: container, scaleX: 1, scaleY: 1, duration: 120 });
    });

    // Click → start game
    container.on('pointerdown', () => {
      this.tweens.add({
        targets: container,
        scaleX: 0.95, scaleY: 0.95,
        duration: 80,
        yoyo: true,
        onComplete: () => {
          this.scene.start('GameScene', {
            category: cat.key,
            ...this._callbacks,
          });
        },
      });
    });

    // Entrance animation
    container.setAlpha(0);
    container.setScale(0.8);
    this.tweens.add({
      targets: container,
      alpha: 1,
      scaleX: 1,
      scaleY: 1,
      delay: 200 + CATEGORIES.indexOf(cat) * 80,
      duration: 350,
      ease: 'Back.easeOut',
    });
  }
}
