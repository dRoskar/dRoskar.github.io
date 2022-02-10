import Title from './titleScene.js';
import Game from './gameScene.js';
import End from './endScene.js';

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    disableContextMenu: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: [
        Title,
        Game,
        End
    ]
};

var game = new Phaser.Game(config);
