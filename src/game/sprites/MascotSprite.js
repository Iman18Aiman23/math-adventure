/**
 * MascotSprite — Friendly mascot character built with Phaser graphics.
 *
 * A bouncy circle-based character with eyes, mouth, and idle/bounce animations.
 */
import Phaser from 'phaser';

export default class MascotSprite {
  /**
   * @param {Phaser.Scene} scene
   * @param {number} x
   * @param {number} y
   * @param {number} size – radius of the body
   */
  constructor(scene, x, y, size = 50) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.size = size;
    this.container = scene.add.container(x, y);

    this._build();
    this._idleAnim();
  }

  _build() {
    const s = this.size;

    // Shadow
    const shadow = this.scene.add.ellipse(0, s * 0.8, s * 1.6, s * 0.3, 0x000000, 0.12);
    this.container.add(shadow);
    this.shadow = shadow;

    // Body — layered circles for depth
    const bodyOuter = this.scene.add.circle(0, 0, s, 0x38bdf8);
    const bodyInner = this.scene.add.circle(0, -s * 0.08, s * 0.88, 0x7dd3fc);
    const bodyHighlight = this.scene.add.circle(-s * 0.25, -s * 0.35, s * 0.22, 0xbae6fd, 0.6);
    this.container.add([bodyOuter, bodyInner, bodyHighlight]);
    this.body = bodyOuter;

    // Eyes
    const eyeOffsetX = s * 0.3;
    const eyeY = -s * 0.15;
    const eyeR = s * 0.2;
    const pupilR = s * 0.1;

    const leftEyeWhite = this.scene.add.circle(-eyeOffsetX, eyeY, eyeR, 0xffffff);
    const rightEyeWhite = this.scene.add.circle(eyeOffsetX, eyeY, eyeR, 0xffffff);
    const leftPupil = this.scene.add.circle(-eyeOffsetX, eyeY, pupilR, 0x1e1b4b);
    const rightPupil = this.scene.add.circle(eyeOffsetX, eyeY, pupilR, 0x1e1b4b);

    // Tiny sparkle in eyes
    const leftSparkle = this.scene.add.circle(-eyeOffsetX - pupilR * 0.3, eyeY - pupilR * 0.3, pupilR * 0.3, 0xffffff, 0.8);
    const rightSparkle = this.scene.add.circle(eyeOffsetX - pupilR * 0.3, eyeY - pupilR * 0.3, pupilR * 0.3, 0xffffff, 0.8);

    this.container.add([leftEyeWhite, rightEyeWhite, leftPupil, rightPupil, leftSparkle, rightSparkle]);
    this.leftPupil = leftPupil;
    this.rightPupil = rightPupil;

    // Mouth — smile arc
    const mouth = this.scene.add.graphics();
    mouth.lineStyle(3, 0x1e1b4b, 1);
    mouth.beginPath();
    mouth.arc(0, s * 0.15, s * 0.25, Phaser.Math.DegToRad(10), Phaser.Math.DegToRad(170), false);
    mouth.strokePath();
    this.container.add(mouth);
    this.mouth = mouth;

    // Cheeks — subtle blush
    const leftCheek = this.scene.add.circle(-s * 0.5, s * 0.1, s * 0.13, 0xfda4af, 0.4);
    const rightCheek = this.scene.add.circle(s * 0.5, s * 0.1, s * 0.13, 0xfda4af, 0.4);
    this.container.add([leftCheek, rightCheek]);
  }

  /** Gentle floating idle animation */
  _idleAnim() {
    this.scene.tweens.add({
      targets: this.container,
      y: this.y - 8,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  /** Celebratory bounce when child answers correctly */
  bounce() {
    // Stop idle briefly
    this.scene.tweens.killTweensOf(this.container);

    this.scene.tweens.add({
      targets: this.container,
      y: this.y - 40,
      scaleX: 1.2,
      scaleY: 0.85,
      duration: 200,
      yoyo: true,
      ease: 'Back.easeOut',
      onComplete: () => {
        // Squash & stretch
        this.scene.tweens.add({
          targets: this.container,
          scaleX: 0.9,
          scaleY: 1.15,
          duration: 150,
          yoyo: true,
          ease: 'Sine.easeInOut',
          onComplete: () => {
            this.container.setScale(1, 1);
            this._idleAnim();
          },
        });
      },
    });
  }

  /** Sad shake for wrong answer */
  shake() {
    this.scene.tweens.add({
      targets: this.container,
      x: this.x - 10,
      duration: 60,
      yoyo: true,
      repeat: 3,
      ease: 'Sine.easeInOut',
      onComplete: () => {
        this.container.x = this.x;
      },
    });
  }

  /** Set visibility */
  setVisible(val) {
    this.container.setVisible(val);
  }

  /** Destroy */
  destroy() {
    this.container.destroy();
  }
}
