import Phaser from 'phaser';
import getKeys from '@capacade/arcadekeymap';
import playerImg from '../assets/img/player.png';
import ground from '../assets/img/ground.png';
import bg from '../assets/img/bg.png';
import coinImg from '../assets/img/coin.png';

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


    this.coin = this.physics.add.sprite(195, 375, 'big_coin');
    /*this.anims.create({
      key: 'coin_anim',
      frames: this.anims.generateFrameNumbers('coin'),
      frameRate: 5,
      repeat: -1,
    });
    this.coin.play('coin_anim');*/

    var customBounds = new Phaser.Geom.Rectangle(0, 0, 800, 600);

    var group = this.physics.add.group({
      key: 'coin',
      frameQuantity: 48,
      bounceX: 1,
      bounceY: 1,
      customBoundsRectangle: customBounds,
      collideWorldBounds: true,
      velocityX: Math.random() * 50 + 100,
      velocityY: Math.random() * 50 + 100,
  });



  Phaser.Actions.RandomRectangle(group.getChildren(), customBounds);


    //this.physics.add.collider(this.player, platforms);
    //this.physics.add.collider(this.coin, platforms);
    //this.physics.add.overlap(this.player, this.coin, this.collectCoin, null, this);

    //this.keys = this.input.keyboard.addKeys(getKeys());
  }

  update() {
   
  }
}
