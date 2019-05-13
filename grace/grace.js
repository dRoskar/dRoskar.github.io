$(window).on('load', function () {
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut();
	$("#preloder").delay(400).fadeOut("slow");
});

var graceHead = new Image();
var graceBody = new Image();
var whisker = new Image();
var engraving = new Image();
var initialBodyScale = 0.32;
var initialHeadScale = 0.42;
var initialWhiskerScale = 0.74;
var initialEngravingScale = 0.5;
var scale;

var clocks = [new Image(), new Image(), new Image(), new Image(), new Image()];
var engravings = [new Image(), new Image(), new Image(), new Image()];

var engravingVersion = 2;
var clockVersion = 4;

function init() {
    graceHead.src = "../img/grace/grace_h_cajgar.png"
    graceBody.src = "../img/grace/grace_body.png"
    whisker.src = "../img/grace/whisker.png"

    clocks[0].src = "../img/grace/clock1.png"
    clocks[1].src = "../img/grace/clock2.png"
    clocks[2].src = "../img/grace/clock3.png"
    clocks[3].src = "../img/grace/clock4.png"
    clocks[4].src = "../img/grace/clock5.png"

    engravings[0].src = "../img/grace/engraving1.png"
    engravings[1].src = "../img/grace/engraving2.png"
    engravings[2].src = "../img/grace/engraving3.png"
    engravings[3].src = "../img/grace/engraving4.png"

    window.requestAnimationFrame(draw);
}

function draw() {
    var ctx = document.getElementById('canvas').getContext('2d');
    document.getElementById('canvas').addEventListener("wheel", wheelz);

    var now = new Date();
    var sec = now.getSeconds();
    var min = now.getMinutes();
    var hr  = now.getHours();
    hr = hr >= 12 ? hr - 12 : hr;

    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    // ---- SCALING ---------------------

    // initial scale
    graceBody.scaledWidth = graceBody.width * initialBodyScale;
    graceBody.scaledHeight = graceBody.height * initialBodyScale;
    graceHead.scaledWidth = graceHead.width * initialHeadScale;
    graceHead.scaledHeight = graceHead.height * initialHeadScale;
    whisker.scaledWidth = whisker.width * initialWhiskerScale;
    whisker.scaledHeight = whisker.height * initialWhiskerScale;
    engravings[0].scaledHeight = engravings[0].height * initialEngravingScale;
    engravings[0].scaledWidth = engravings[0].width * initialEngravingScale;

    // scale
    if(ctx.canvas.width <= ctx.canvas.height) {
        scale = ctx.canvas.width/clocks[0].width;
    } else {
        scale = ctx.canvas.height/clocks[0].height;
    }

    clocks[0].scaledWidth = clocks[0].width * scale;
    clocks[0].scaledHeight = clocks[0].height * scale;

    graceBody.scaledWidth = graceBody.scaledWidth * scale;
    graceBody.scaledHeight = graceBody.scaledHeight * scale;
    graceHead.scaledWidth = graceHead.scaledWidth * scale;
    graceHead.scaledHeight = graceHead.scaledHeight * scale;
    whisker.scaledWidth = whisker.scaledWidth * scale;
    whisker.scaledHeight = whisker.scaledHeight * scale;
    engravings[0].scaledHeight = engravings[0].scaledHeight * scale;
    engravings[0].scaledWidth = engravings[0].scaledWidth * scale;

    // ---- DRAWING -----------------------

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    //bakground color
    ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#ffe6e6";
    ctx.fill();

    // move to the center of the canvas
    ctx.translate(ctx.canvas.width/2, ctx.canvas.height/2);

    // clock face
    ctx.drawImage(clocks[clockVersion],
        -clocks[0].scaledWidth/2,
        -clocks[0].scaledHeight/2,
        clocks[0].scaledWidth,
        clocks[0].scaledHeight);

    // engraving
    ctx.drawImage(engravings[engravingVersion],
        -engravings[0].scaledWidth/2,
        -engravings[0].scaledHeight/2 - 380*initialEngravingScale*scale,
        engravings[0].scaledWidth,
        engravings[0].scaledHeight);    

    // minutes - body
    ctx.save();
    ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
    ctx.drawImage(graceBody,
        -graceBody.scaledWidth/2 + 100*initialBodyScale*scale,
        -graceBody.scaledHeight/2 - 580*initialBodyScale*scale,
        graceBody.scaledWidth,
        graceBody.scaledHeight);
    ctx.restore();

    // hours - head
    ctx.rotate(hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) *sec);
    ctx.lineWidth = 14;
    ctx.drawImage(graceHead,
        -graceHead.scaledWidth/2 - 110*initialHeadScale*scale,
        -graceHead.scaledHeight/2 - 70*initialHeadScale*scale,
        graceHead.scaledWidth,
        graceHead.scaledHeight);
     
    // Write seconds
    ctx.translate(175*initialHeadScale*scale, 50*initialHeadScale*scale);
    ctx.rotate(sec * Math.PI / 30);
    ctx.drawImage(whisker,
        -whisker.scaledWidth/2,
        -whisker.scaledHeight + 5*initialWhiskerScale*scale,
        whisker.scaledWidth,
        whisker.scaledHeight);

    window.requestAnimationFrame(draw);
}

function wheelz(e){

    if(e.shiftKey) {
        if(e.deltaY > 0) {
            engravingVersion--
            engravingVersion = engravingVersion <= -1 ? 0 : engravingVersion;
        } else {
            engravingVersion++;
            engravingVersion = engravingVersion >= 4 ? 3 : engravingVersion;
        }

    } else {
        if(e.deltaY > 0) {
            clockVersion--
            clockVersion = clockVersion <= -1 ? 0 : clockVersion;
        } else {
            clockVersion++;
            clockVersion = clockVersion >= 5 ? 4 : clockVersion;
        }
    }
}

init();