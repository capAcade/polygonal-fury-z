import Phaser from 'phaser';
import bootGame from './scenes/bootGame';
import playGame from './scenes/playTheGameScene';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1920,
  height: 1080,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  scene: [bootGame, playGame],
};

// eslint-disable-next-line
const game = new Phaser.Game(config);
