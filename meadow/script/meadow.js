// $(window).on('load', function () {
// 	/*------------------
// 		Preloder
// 	--------------------*/
// 	$(".loader").fadeOut();
// 	$("#preloder").delay(400).fadeOut("slow");
// });


// function init() {
//     requestAnimationFrame(draw);
// }

// function draw() {
//     var ctx = document.getElementById('canvas').getContext('2d');
//     console.log("frame");
//     requestAnimationFrame(draw);
// }

// init();

var config = {
    type: Phaser.AUTO,
    width: window.innerWidth/4,
    height: window.innerHeight/4,
    disableContextMenu: true,
    PixelArt: true,
    zoom: 4,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var campfire;
var game = new Phaser.Game(config);

function preload ()
{
    // load map
    this.load.image('spark', 'assets/spark.png');
    this.load.image('map_tiles', 'assets/map/tileset_2_ex.png');
    this.load.tilemapTiledJSON('map', 'assets/map/map3_ex.json');

    this.load.spritesheet('campfire', 'assets/fire.png', { frameWidth: 32, frameHeight: 32 });
}

function create ()
{
    // create map
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('tileset_2_ex', 'map_tiles');
    var layer = map.createStaticLayer('Tile Layer 1', tileset, 0, 0);

    // configure animations
	this.anims.create({
        key: 'campfire_anim',
        frames: this.anims.generateFrameNumbers('campfire', {start: 0, end: 6}),
        frameRate: 6,
        repeat: -1
    })

    // place objects
    campfire = this.add.sprite(191, 339, 'campfire').setInteractive();
    
    var particles = this.add.particles('spark');

    var campfire_emitter = particles.createEmitter({
        speed: 80,
        x: 191,
        y: 339,
        on: false,
        bounce: 0.3,
        bounds: {x: campfire.x - 200, y: campfire.y - 100, width: 400, height: 115},
        collideLeft: false,
        collideRight: false,
        collideTop: false,
        angle: { min: 220, max: 320 },
        gravityY: 170,
        lifespan:  { min: 800, max: 1600 },
        blendMode: 'ADD'
    });

    campfire.on('pointerdown', function ()
    {
        campfire_emitter.emitParticle(Phaser.Math.Between(1, 3));
    });

    // camera controls
    var cursors = this.input.keyboard.createCursorKeys();

    controls = new Phaser.Cameras.Controls.SmoothedKeyControl({
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        acceleration: 0.02,
        drag: 0.0004,
        maxSpeed: 0.2
    });

    // restrict camera movement
    this.cameras.main.setBounds(0, 0, layer.width, layer.height);
}

function update (time, delta)
{
    campfire.anims.play('campfire_anim', true);
    controls.update(delta);

    if (this.input.activePointer.isDown) {
        if (this.origDragPoint) {
          // move the camera by the amount the mouse has moved since last update
          this.cameras.main.scrollX +=
            this.origDragPoint.x - this.input.activePointer.position.x;
          this.cameras.main.scrollY +=
            this.origDragPoint.y - this.input.activePointer.position.y;
        } // set new drag origin to current position
        this.origDragPoint = this.input.activePointer.position.clone();
      } else {
        this.origDragPoint = null;
      }
}