import Phaser from 'phaser';

export default class Explosion {
  constructor(scene, x, y, group, callback) {

    this.scene = scene;
    this.group = group;
    this.alive = true;

    this.explosion = this.scene.physics.add.image(x, y, 'circle_big');
    this.explosion.setCircle(55);
    this.explosion.setScale(0.4);
    
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
    this.explosion.setScale(this.explosion.scale + 0.1)  
    if(this.explosion.scale > 2.5 && this.alive){
      this.explosion.destroy();
      this.alive = false;
      this.onDeath(this.explosion.x, this.explosion.y);
    }
  }

  onDeath(x, y){
       //  this.explosions.splice(i, 1);

        var emitter0 = this.scene.add.particles('spark0').createEmitter({
          x: x,
          y: y,
          speed: { min: -800, max: 800 },
          angle: { min: 0, max: 360 },
          scale: { start: 0.5, end: 0 },
          blendMode: 'SCREEN',
          //active: false,
          lifespan: 600,
          gravityY: 800,
        });
  
        var emitter1 = this.scene.add.particles('spark1').createEmitter({
            x: x,
            y: y,
            speed: { min: -800, max: 800 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.3, end: 0 },
            blendMode: 'SCREEN',
            //active: false,
            lifespan: 300,
            gravityY: 800,
        });

        //this.sound.add('lazer');
  
        emitter0.explode(150, x, y);
        emitter1.explode(150, x, y);
  }

  getBody(){
    return this.body;
  }
}
