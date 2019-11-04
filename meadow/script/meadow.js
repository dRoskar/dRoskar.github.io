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
    this.load.image('star', 'assets/star.png');
    this.load.spritesheet('campfire', 'assets/fire.png', { frameWidth: 128, frameHeight: 128 });
}

function create ()
{
	this.anims.create({
        key: 'campfire',
        frames: this.anims.generateFrameNumbers('campfire', {start: 0, end: 6}),
        frameRate: 6,
        repeat: -1
    })

    campfire = this.add.sprite(400, 300, 'campfire');
}

function update ()
{
    campfire.anims.play('campfire', true);
}