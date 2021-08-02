import Phaser from 'phaser';

export default class bootGame extends Phaser.Scene {
  constructor() {
    super('bootgame');
  }

  create() {
    this.add.text(20, 20, 'loading game...');
    setTimeout(() => this.scene.start('playTheGame'), 30);
  }
}
