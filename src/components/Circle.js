import Phaser from 'phaser';

export default class Circle {
  constructor(scene, x, y, callback) {

    this.scene = scene;
    let body = this.scene.physics.add.image(Math.random() * 1920, Math.random() * 1080, 'circle_big');
    this.body = body;

    this.body.setScale(0.3);
    this.body.setVelocity(Math.random() * 50 + 100, Math.random() * 150 + 50);
    this.body.setBounce(1, 1);
    this.body.setCollideWorldBounds(true);
    this.body.setInteractive();
    this.body.on('pointerdown', () => {
      // kill when done
      body.destroy();
      callback(this.body);
    });
  }

  getBody(){
    return this.body;
  }
}
