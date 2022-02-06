class Game extends Phaser.Scene {

    constructor () {
        super('Game');
        this.keys;
        this.ship;
    }

    init() {
    }

    preload() {
        this.load.image('background', 'assets/bg.jpg');
        this.load.image('cakic', 'assets/cakic.jpg');
        this.load.image('ship', 'assets/ship.png');
    }

    create(data) {
        this.add.image(400, 300, 'background');
        this.add.image(400, 300, 'cakic');

        this.ship = this.physics.add.staticImage(400, 575, 'ship');

        // input
        this.keys = this.input.keyboard.addKeys('SPACE,W,A,D,LEFT,RIGHT,UP');

        // input
        this.input.keyboard.on('keydown-ESC', function(event) {
            event.stopPropagation();
            this.scene.start('Title');
        }, this);
        
    }

    update(time, delta) {
        if(this.keys.SPACE.isDown || this.keys.W.isDown || this.keys.UP.isDown) {
            console.log('pew pew');
        }

        if(this.keys.A.isDown || this.keys.LEFT.isDown) {
            if(this.ship.x >= 40) {
                this.ship.x = this.ship.x - 5;
            }
        }

        if(this.keys.D.isDown || this.keys.RIGHT.isDown) {
            if(this.ship.x <= 760) {
                this.ship.x = this.ship.x + 5;
            }
        }
    }
}

export default Game;