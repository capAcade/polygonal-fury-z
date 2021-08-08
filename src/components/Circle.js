import Phaser from 'phaser';

export default class Circle {
  constructor(scene, x, y, callback) {

    this.scene = scene;
    let body = this.scene.physics.add.image(Math.random() * 800, Math.random() * 600, 'coin');
    this.body = body;

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
