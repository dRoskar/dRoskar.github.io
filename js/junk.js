var CANVAS_WIDTH = 480;
var CANVAS_HEIGHT = 320;
var FPS = 60;
var playerBullets = [];

$(document).ready(function() {
$("#header").html("Junk");
var canvas = $("#cvs").get(0).getContext("2d");
   
setInterval(function() {
    update();
    draw();
}, 1000/FPS);


function update() {
    // player
    if(keydown.left) {
        player.x -= 2;
    }

    if(keydown.right) {
        player.x += 2;
    }

    if(keydown.space) {
        player.shoot();
    }

    // bullet
    console.info(playerBullets.length);
    playerBullets.forEach(function(bullet) {
        bullet.update();
    });

    playerBullets = playerBullets.filter(function(bullet){
        return bullet.active;
    });
}

function draw() {
    // clear
    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // player
    player.draw();

    // bullets
    playerBullets.forEach(function(bullet) {
        bullet.draw();
      });
}

var player = {
    color: "#00A",
    x: 220,
    y: 270,
    width: 32,
    height: 32,
    draw: function() {
        canvas.fillStyle = this.color;
        canvas.fillRect(this.x, this.y, this.width, this.height);
    }
};

player.shoot = function() {
    var bulletPosition = this.getCenter();

    playerBullets.push(Bullet({
        speed: 2,
        x: bulletPosition.x,
        y: bulletPosition.y
    }));
}

player.getCenter = function() {
    return {
        x: this.x + this.width/2,
        y: this.y + this.height/2
    };
};




function Bullet(I) {
    I.active = true;
    I.yVelocity = -I.speed;
    I.width = 3;
    I.height = 3;
    I.color = "#000";

    I.inBounds = function() {
        return I.x >= 0 && I.x <= CANVAS_WIDTH &&
        I.y >= 0 && I.y <= CANVAS_HEIGHT;
    };

    I.draw = function() {
        canvas.fillStyle = this.color;
        canvas.fillRect(this.x, this.y, this.width, this.height);
    }

    I.update = function() {
        I.x += I.xVelocity;
        I.y += I.yVelocity;

        I.active = I.active && I.inBounds();
    };

    return I;
}

});

