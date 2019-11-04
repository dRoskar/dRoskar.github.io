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
    width: 800,
    height: 600,
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
    this.load.image('map_tiles', 'assets/map/grass.png');
    this.load.tilemapTiledJSON('map', 'assets/map/map1.json');

    this.load.image('star', 'assets/star.png');
    this.load.spritesheet('campfire', 'assets/fire.png', { frameWidth: 128, frameHeight: 128 });
}

function create ()
{
    // create map
    var map = this.make.tilemap({ key: 'map' });
    var tileset = map.addTilesetImage('grass', 'map_tiles');
    var layer = map.createStaticLayer('Tile Layer 1', tileset, 0, 0);

    // configure animations
	this.anims.create({
        key: 'campfire_anim',
        frames: this.anims.generateFrameNumbers('campfire', {start: 0, end: 6}),
        frameRate: 6,
        repeat: -1
    })

    // place objects
    campfire = this.add.sprite(700, 400, 'campfire');

    // camera controls
    var cursors = this.input.keyboard.createCursorKeys();

    var controlConfig = {
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        acceleration: 0.04,
        drag: 0.0005,
        maxSpeed: 0.7
    };

    controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

    // restrict camera movement
    this.cameras.main.setBounds(0, 0, layer.width, layer.height);
}

function update (time, delta)
{
    campfire.anims.play('campfire_anim', true);
    controls.update(delta);

    if (this.input.activePointer.isDown) {
        campfire.x+=campfire.x/10;
      }
}