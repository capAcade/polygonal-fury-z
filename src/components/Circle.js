import Phaser from 'phaser';

export default class Circle {
  constructor(scene, type, x, y, group, callBack) {

    this.scene = scene;
    this.group = group;
    this.body = this.scene.physics.add.image(x, y, 'circle_big');;
    
    this.body.setCircle(50);
    this.body.setScale(0.3);
    this.body.setVelocity(Math.random() * 50 + 100, Math.random() * 150 + 50);
    this.body.setBounce(1, 1);
    this.body.setCollideWorldBounds(true);
    this.body.setInteractive();
    this.body.on('pointerdown', () => {
      // kill when done
      this.body.destroy();

      callBack(this.body.x, this.body.y, true);
    });

    this.group.add(this.body);
  }


  getBody(){
    return this.body;
  }
}
