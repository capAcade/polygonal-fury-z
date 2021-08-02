import Phaser from 'phaser';
import bootGame from './scenes/bootGame';
import playGame from './scenes/playTheGameScene';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [bootGame, playGame],
};

// eslint-disable-next-line
const game = new Phaser.Game(config);
