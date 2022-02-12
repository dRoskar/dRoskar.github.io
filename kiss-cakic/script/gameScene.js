class Game extends Phaser.Scene {

    constructor () {
        super('Game');
        this.keys;
        this.ship;
        this.shooting;
        this.shot;
        this.ray;
        this.leftEye = true;
    }

    init() {
    }

    preload() {
        this.load.image('background', 'assets/bg.jpg');
        this.load.image('cakic', 'assets/cakic.jpg');
        this.load.image('ship', 'assets/ship.png');
        this.load.image('shot', 'assets/shot.png');
        this.load.image('ray', 'assets/ray.png');
    }

    create(data) {
        this.shooting = false;

        this.add.image(400, 300, 'background');
        this.add.image(400, 300, 'cakic');

        this.ship = this.physics.add.staticImage(400, 575, 'ship');
        this.shot = this.physics.add.staticImage(0, 0, 'shot').setVisible(false);
        this.ray = this.physics.add.image(0, 0, 'ray').setVisible(false);
        this.ray.body.setAllowDrag(false);

        this.physics.add.overlap(this.ship, this.ray, onDeath, null, this);
        this.physics.add.overlap(this.ship, this.ray, onDeath, null, this);

        // ray event
        this.time.addEvent({ delay: 1500, callback: onRay, callbackScope: this, loop: true });

        // input
        this.keys = this.input.keyboard.addKeys('SPACE,W,A,D,LEFT,RIGHT,UP');

        // input
        this.input.keyboard.on('keydown-ESC', function(event) {
            event.stopPropagation();
            this.scene.start('Title');
        }, this);
    }

    update(time, delta) {   
        this.ship.refreshBody();

        if((this.keys.SPACE.isDown || this.keys.W.isDown || this.keys.UP.isDown) && !this.shooting) {
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
            this.shot.refreshBody();

            if(this.shot.y <= 0) {
                this.shot.setVisible(false);
                this.shooting = false;
            }
        }
    }
}

function onRay() {
    // get random angle between 60 and 120
    var angle = Math.floor(Math.random() * 61) + 60;
    this.ray.setAngle(angle + 90);
    if(this.leftEye) {
        this.ray.setPosition(352, 265);
    } else {
        this.ray.setPosition(435, 265);
    }
    this.physics.velocityFromAngle(angle, 480, this.ray.body.velocity);
    this.ray.setVisible(true);
    this.leftEye = !this.leftEye;
}

function onDeath() {
    // this.scene.start('End');
}


export default Game;
