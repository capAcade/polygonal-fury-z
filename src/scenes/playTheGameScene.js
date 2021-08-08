import Phaser from 'phaser';
import getKeys from '@capacade/arcadekeymap';
import playerImg from '../assets/img/player.png';
import ground from '../assets/img/ground.png';
import bg from '../assets/img/bg.png';
import coinImg from '../assets/img/coin.png';
import Circle from '../components/Circle';

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
    this.load.spritesheet('coin', coinImg, { frameWidth: 22, frameHeight: 22 });
    this.load.spritesheet('big_coin', coinImg, { frameWidth: 150, frameHeight: 150 });
  }

  create() {
    this.add.image(0, 0, 'bg').setOrigin(0, 0).setScale(0.78);

    this.coins = this.add.group();

    for(var i = 0; i < 50; i++){
      let coin = new Circle(this, Math.random() * 800, Math.random() * 600, this.addExplosion.bind(this));
      this.coins.add(coin.getBody());
      //this.coins.add(coin);
    }
  }

  update() {
    for(let i in this.explosions){
      let explosion = this.explosions[i];
      explosion.setScale(explosion.scale + 0.2)
      
      if(explosion.scale > 10){
        explosion.destroy();
        this.explosions.splice(i, 1);


      }
    }
  }

  addExplosion(circle) {
    console.log(circle.x, circle.y);
    console.log('boem');

    let explosion = this.physics.add.image(circle.x, circle.y, 'coin');
    
    this.physics.add.overlap(explosion,  this.coins, (explosion, circle) => {
      //check the scale for small explosion delay
      if(explosion.scale > 5){
        circle.destroy();
        this.addExplosion(circle);
      }
    });

    this.explosions.push(explosion);
  }
}
