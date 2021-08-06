import Phaser from 'phaser';
import coinImg from '../assets/img/coin.png';

export default class Circle extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y) {
    super(scene, x, y, 'coin');
    scene.add.existing(this);
    scene.physics.world.enable(this);
    this.body.velocity.setTo(Math.random() * 50 + 100, Math.random() * 50 + 100);
    this.body.bounce.setTo(1, 1);
    this.body.collideWorldBounds = true;
    this.body.interactive = true;
  }
  
  preload() {
    this.load.spritesheet('coin', coinImg, { frameWidth: 22, frameHeight: 22 });
  }
}
