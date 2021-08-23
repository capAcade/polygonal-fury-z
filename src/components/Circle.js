import Phaser from 'phaser';

export default class Circle {
  constructor(scene, type, x, y, group, explode) {
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
    this.explode = explode;
    //only take dmg by the same explosion once
    this.takenDamageBy = [];

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
    
    this.body.takeDamage = this.takeDamage.bind(this);
    this.body.setCircle(40);
    this.body.setScale(0.6);
    this.body.setVelocity(Math.random() * 50 + 100, Math.random() * 150 + 50);
    this.body.setBounce(1, 1);
    this.body.setCollideWorldBounds(true);
    this.body.setInteractive();
    this.body.on('pointerdown', () => {
      this.scene.clicks++;
      this.scene.text.setText([
        this.scene.count + '/' + this.scene.gameObjects.children.size,
        'Clicks:' + this.scene.clicks
      ]);
      this.takeDamage();
    });

    this.group.add(this.body);
  }

  takeDamage(explosion){
    if(explosion){
      if(this.takenDamageBy.find(element => element === explosion)){
        return;
      }
      this.takenDamageBy.push(explosion);
    }
    
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
      this.explode(this.body.x, this.body.y, true);
    }
  }


  getBody(){
    return this.body;
  }
}
