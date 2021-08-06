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

    var customBounds = new Phaser.Geom.Rectangle(0, 0, 800, 600);

    this.coins = [];

    for(var i = 0; i < 50; i++){
      // let coin = this.physics.add.image(Math.random() * 800, Math.random() * 600, 'coin');

      let coin = new Circle(this, Math.random() * 800, Math.random() * 600, 'coin');

      
      this.coins.push(coin);

      this.physics.add.existing(coin);
  
    }



    //this.physics.add.collider(this.player, platforms);
    //this.physics.add.collider(this.coin, platforms);
    //this.physics.add.overlap(this.player, this.coin, this.collectCoin, null, this);

    //this.keys = this.input.keyboard.addKeys(getKeys());
  }

  update() {
   
  }
}
