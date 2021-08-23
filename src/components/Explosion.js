import Phaser from 'phaser';

export default class Explosion {
  constructor(scene, x, y, group, callback) {

    this.scene = scene;
    this.group = group;
    this.exploding = false;
    this.alive = true;

    this.explosion = this.scene.physics.add.sprite(x, y, 'circle');
    this.explosion.setFrame(18);
    this.explosion.setCircle(40);
    this.explosion.setScale(0.6);

    this.scene.anims.create({
      key: 'explode-circle-final',
      frames: this.scene.anims.generateFrameNumbers('circle', { frames: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30] }),
      frameRate: 24,
      hideOnComplete: true
    });
    
    
    this.scene.physics.add.overlap(this.explosion,  this.group, (explosion, object) => {
      //check the scale for small explosion delay
      if(explosion.scale > 2){
        object.destroy();
        callback(object.x, object.y, false);
        //this.addExplosion(circle, false);
      }
    });
  }

  update(){
    if(!this.exploding){
      this.explosion.setScale(this.explosion.scale + 0.1)  
      if(this.explosion.scale > 2.5 && this.alive){
        this.exploding = true;
        this.explosion.play('explode-circle-final');
  
      }
    }
    if(this.explosion && this.explosion.anims && this.explosion.anims.currentFrame){
      if(this.explosion.anims.currentFrame.index > 12){
        this.alive = false;
        this.explosion.destroy();
      }
    }
  }

  getBody(){
    return this.body;
  }
}
