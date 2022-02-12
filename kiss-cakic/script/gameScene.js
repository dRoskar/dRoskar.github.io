class Game extends Phaser.Scene {

    constructor () {
        super('Game');
    }

    init() {
    }

    preload() {
        this.load.image('background', 'assets/bg.jpg');
        this.load.image('win', 'assets/youwin.png');
        this.load.image('lose', 'assets/youlose.png');
        this.load.image('cakic', 'assets/cakic.jpg');
        this.load.image('ship', 'assets/ship.png');
        this.load.image('shot', 'assets/shot.png');
        this.load.image('ray', 'assets/ray.png');
        this.load.spritesheet('bloodLeft', 'assets/bloodLeft.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('bloodRight', 'assets/bloodRight.png', { frameWidth: 64, frameHeight: 64 });
    }

    create(data) {
        this.shooting = false;
        this.leftSideRay = true;
        this.hitCountLeft = 0;
        this.hitCountRight = 0;

        this.add.image(400, 300, 'background');
        this.add.image(400, 300, 'cakic');
        this.win = this.add.image(400, 300, 'win').setVisible(false);
        this.lose = this.add.image(400, 300, 'lose').setVisible(false);

        this.ship = this.physics.add.image(400, 575, 'ship');
        this.ship.body.setSize(60, 30);
        this.shot = this.physics.add.image(-50, -50, 'shot').setVisible(false);
        this.shot.body.setSize(8, 20);
        this.ray = this.physics.add.image(-50, -50, 'ray').setVisible(false);
        this.ray.body.setSize(8, 20);

        this.ship.body.setAllowDrag(false);
        this.shot.body.setAllowDrag(false);
        this.ray.body.setAllowDrag(false);

        this.eyes = this.physics.add.staticGroup();
        this.leftEye = this.eyes.create(351, 269, 'bloodLeft', 0).setVisible(false);
        this.rightEye = this.eyes.create(437, 269, 'bloodRight', 0).setVisible(false);
        this.leftEye.left = true;
        this.rightEye.left = false;
        this.leftEye.body.setSize(35, 20);
        this.rightEye.body.setSize(35, 20);

        // colliders
        this.physics.add.overlap(this.ship, this.ray, onDeath, null, this);
        this.physics.add.overlap(this.shot, this.eyes, onHit, null, this);

        // ray event
        this.time.addEvent({ delay: 1500, callback: onRay, callbackScope: this, loop: true });

        // input
        this.keys = this.input.keyboard.addKeys('SPACE,W,A,D,LEFT,RIGHT,UP');

        this.input.keyboard.on('keydown-ESC', function(event) {
            event.stopPropagation();
            this.scene.start('Title');
        }, this);
    }

    update(time, delta) {   
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

            if(this.shot.y <= 0) {
                this.shot.setVisible(false);
                this.shooting = false;
            }
        }

        // check win condition
        if (this.hitCountLeft >= 20 && this.hitCountRight >= 20) {
            win(this);
        }
    }
}

function onRay() {
    // get random angle between 60 and 120
    var angle = Math.floor(Math.random() * 61) + 60;
    this.ray.setAngle(angle + 90);
    if(this.leftSideRay) {
        this.ray.setPosition(352, 265);
    } else {
        this.ray.setPosition(435, 265);
    }
    this.physics.velocityFromAngle(angle, 480, this.ray.body.velocity);
    this.ray.setVisible(true);
    this.leftSideRay = !this.leftSideRay;
}

function onDeath() {
    this.lose.setVisible(true);
    this.ship.body.enable = false;
    this.ship.setVisible(false);
}

function win(context) {
    context.win.setVisible(true);
    context.ship.body.enable = false;
}

function onHit(shot, eye) {

    this.shot.setVisible(false);
    this.shot.setPosition(-50, 50);
    this.shooting = false;

    if(eye.left) {
        this.hitCountLeft++;
        if(this.hitCountLeft < 16 && this.hitCountLeft >= 3) {
            eye.setFrame(Math.floor(this.hitCountLeft/3) - 1);
            eye.setVisible(true);
        } else if(this.hitCountLeft >= 20) {
            eye.setFrame(5);
            eye.body.enable = false;
        }
    } else{
        this.hitCountRight++;
        if(this.hitCountRight < 16 && this.hitCountRight >= 3) {
            eye.setFrame(Math.floor(this.hitCountRight/3) - 1);
            eye.setVisible(true);
        } else if (this.hitCountRight >= 20) {
            eye.setFrame(5);
            eye.body.enable = false;
        }
    }
}

export default Game;
