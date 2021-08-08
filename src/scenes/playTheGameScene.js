import Phaser from 'phaser';
import getKeys from '@capacade/arcadekeymap';
import playerImg from '../assets/img/player.png';
import ground from '../assets/img/ground.png';
import bg from '../assets/img/bg.png';
import coinImg from '../assets/img/coin.png';
import circleImg from '../assets/img/circle_big.png';
import Circle from '../components/Circle';

import flaresImg from '../assets/img/flares.png';
import flaresJson from '../assets/img/flares.json';
import redImg from '../assets/img/red.png';
import blueImg from '../assets/img/blue.png';

export default class playTheGame extends Phaser.Scene {
  constructor() {
    super('playTheGame');

    this.explosions = [];
  }

  collectCoin() {
    this.coin.disableBody(true, true);
  }

  preload() {
    this.load.image('bg', bg);
    this.load.image('coin', coinImg);
    this.load.spritesheet('circle_big', circleImg, { frameWidth: 115, frameHeight: 115 });
    this.load.atlas('flares', flaresImg, flaresJson);
    this.load.image('spark0', blueImg);
    this.load.image('spark1', redImg);
  }

  create() {
    //this.add.image(0, 0, 'bg').setOrigin(0, 0).setScale(0.78);

    this.coins = this.add.group();

    for(var i = 0; i < 150; i++){
      let coin = new Circle(this, Math.random() * 1920, Math.random() * 1080, this.addExplosion.bind(this));
      this.coins.add(coin.getBody());
      //this.coins.add(coin);
    }

    this.particles = this.add.particles('flares');
  }

  update() {
    for(let i in this.explosions){
      let explosion = this.explosions[i];
      explosion.setScale(explosion.scale + 0.1)
      
      if(explosion.scale > 2.5){
        explosion.destroy();
        this.explosions.splice(i, 1);

        var emitter0 = this.add.particles('spark0').createEmitter({
          x: explosion.x,
          y: explosion.y,
          speed: { min: -800, max: 800 },
          angle: { min: 0, max: 360 },
          scale: { start: 0.5, end: 0 },
          blendMode: 'SCREEN',
          //active: false,
          lifespan: 600,
          gravityY: 800,
        });
  
        var emitter1 = this.add.particles('spark1').createEmitter({
            x: explosion.x,
            y: explosion.y,
            speed: { min: -800, max: 800 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.3, end: 0 },
            blendMode: 'SCREEN',
            //active: false,
            lifespan: 300,
            gravityY: 800,
        });
  
        emitter0.explode(150, explosion.x, explosion.y);
        emitter1.explode(150, explosion.x, explosion.y);
      }
    }
  }

  addExplosion(circle) {
    console.log(circle.x, circle.y);
    console.log('boem');

    let explosion = this.physics.add.image(circle.x, circle.y, 'circle_big');
    explosion.setScale(0.4);
    
    this.physics.add.overlap(explosion,  this.coins, (explosion, circle) => {
      //check the scale for small explosion delay
      if(explosion.scale > 2){
        circle.destroy();
        this.addExplosion(circle);
      }
    });

    this.explosions.push(explosion);
  }
}
