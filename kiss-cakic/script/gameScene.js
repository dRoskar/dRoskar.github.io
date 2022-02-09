class Game extends Phaser.Scene {

    constructor () {
        super('Game');
        this.keys;
        this.ship;
        this.shooting;
        this.shot;
    }

    init() {
    }

    preload() {
        this.load.image('background', 'assets/bg.jpg');
        this.load.image('cakic', 'assets/cakic.jpg');
        this.load.image('ship', 'assets/ship.png');
        this.load.image('shot', 'assets/ray.png');
    }

    create(data) {
        this.shooting = false;

        this.add.image(400, 300, 'background');
        this.add.image(400, 300, 'cakic');

        this.ship = this.physics.add.staticImage(400, 575, 'ship');
        this.shot = this.physics.add.staticImage(400, 300, 'shot').setVisible(false);
        // this.shots = this.physics.add.staticGroup();

        // input
        this.keys = this.input.keyboard.addKeys('SPACE,W,A,D,LEFT,RIGHT,UP');

        // input
        this.input.keyboard.on('keydown-ESC', function(event) {
            event.stopPropagation();
            this.scene.start('Title');
        }, this);
        
    }

    update(time, delta) {
        if((this.keys.SPACE.isDown || this.keys.W.isDown || this.keys.UP.isDown) && !this.shooting) {
            console.log('pew pew');
            this.shot.setPosition(this.ship.x, this.ship.y - 15);
            this.shot.setVisible(true);
            this.shooting = true;
        }

        if(this.keys.A.isDown || this.keys.LEFT.isDown) {
            if(this.ship.x >= 40) {
                this.ship.x = this.ship.x - 4;
            }
        }

        if(this.keys.D.isDown || this.keys.RIGHT.isDown) {
            if(this.ship.x <= 760) {
                this.ship.x = this.ship.x + 4;
            }
        }

        if(this.shooting) {
            this.shot.y = this.shot.y - 10;

            if(this.shot.y <= 0) {
                this.shot.setVisible(false);
                this.shooting = false;
            }
        }
    }
}

export default Game;