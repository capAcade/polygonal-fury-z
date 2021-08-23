import Phaser from 'phaser';

export default class Circle {
  constructor(scene, type, x, y, group, callBack) {
    this.scene = scene;
    this.group = group;
    this.body = this.scene.physics.add.sprite(x, y, 'circle');
    this.scene.anims.create({
      key: 'explode-circle-outer',
      frames: this.scene.anims.generateFrameNumbers('circle', { frames: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9] }),
      frameRate: 24,
    });
    this.scene.anims.create({
      key: 'explode-circle-middle',
      frames: this.scene.anims.generateFrameNumbers('circle', { frames: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18] }),
      frameRate: 24,
    });

    switch(type){
      case "lvl11":
        this.body.setFrame(18);
        this.lives = 1;
        break;
      case "lvl2":
        this.body.setFrame(9);
        this.lives = 2;
        break;
      default:
        this.body.setFrame(0);
        this.lives = 3;
    }

    //this.body.setFrame(18);
    /*this.scene.anims.create({
      key: 'explode-circle-final',
      frames: this.scene.anims.generateFrameNumbers('circle', { frames: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30] }),
      frameRate: 24,
      hideOnComplete: true
    });*/
    
    this.body.setCircle(40);
    this.body.setScale(0.6);
    this.body.setVelocity(Math.random() * 50 + 100, Math.random() * 150 + 50);
    this.body.setBounce(1, 1);
    this.body.setCollideWorldBounds(true);
    this.body.setInteractive();
    this.body.on('pointerdown', () => {
      console.log('on pointer down')
      this.lives--;
      
      if(this.lives == 2){
        this.body.play('explode-circle-outer');
      }
      if(this.lives == 1){
        this.body.play('explode-circle-middle');
      }
      // kill when out of lives
      if(this.lives <= 0){
        //this.body.play('explode-circle-final');

        this.body.destroy();
        callBack(this.body.x, this.body.y, true);
      }
    });

    this.group.add(this.body);
  }


  getBody(){
    return this.body;
  }
}
