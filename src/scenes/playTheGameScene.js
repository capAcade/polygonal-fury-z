import Phaser from 'phaser';
import getKeys from '@capacade/arcadekeymap';
import playerImg from '../assets/img/player.png';
import ground from '../assets/img/ground.png';
import bg from '../assets/img/bg.png';
import coinImg from '../assets/img/coin.png';
import circleImg from '../assets/img/circle_big.png';
import Circle from '../components/Circle';
import Explosion from '../components/Explosion';

import redImg from '../assets/img/red.png';
import blueImg from '../assets/img/blue.png';
import circleAnimations from '../assets/img/default_name.png';

import levelData from '../assets/data/levels.json'

export default class playTheGame extends Phaser.Scene {
  constructor() {
    super('playTheGame');

    this.explosions = [];
    this.currentLevel = 0;
    this.clicks = 0;
  }

  preload() {
    this.load.spritesheet('circle_big', circleImg, { frameWidth: 115, frameHeight: 115 });
    this.load.image('spark0', blueImg);
    this.load.image('spark1', redImg);
    this.load.spritesheet('circle', circleAnimations, { frameWidth: 99, frameHeight: 99 });

  }

  create() {
    //this.add.image(0, 0, 'bg').setOrigin(0, 0).setScale(0.78);

    this.loadLevel(this.currentLevel);

    this.particles = this.add.particles('flares');

    this.text = this.add.text(50, 900, '', { font: '55px Courier', fill: '#00ff00' });
    this.text.setText([
      this.count + '/' + this.count,
      'Clicks:' + 0
     ]);
  }

  loadLevel(nr){
    // reset game objects
    this.gameObjects = this.add.group();

    let level = levelData[nr];

    for(var i = 0; i < level.circles.lvl1; i++){
      new Circle(this, 'lvl1', Math.random() * 1920, Math.random() * 1080, this.gameObjects, this.addExplosion.bind(this));
    }

    this.count = this.gameObjects.children.size;
  }

  update() {
    for(let i in this.explosions){
      let explosion = this.explosions[i];

      if(explosion.alive){
        explosion.update();
      }
      else{
        this.explosions.splice(i, 1);
      }
    }
  }

  addExplosion(x, y) {
    this.explosions.push(new Explosion(this, x, y, this.gameObjects, this.addExplosion.bind(this)));

  }
}
