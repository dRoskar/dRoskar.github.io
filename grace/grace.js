var graceHead = new Image();
var graceBody = new Image();
var whisker = new Image();
var engraving = new Image();
var clock = new Image();
var initialBodyScale = 0.32;
var initialHeadScale = 0.42;
var initialWhiskerScale = 0.74;
var initialEngravingScale = 0.5;
var scale;

var engravingVersion = 3;
var clockVersion = 1;

function init() {
    graceHead.src = "../img/grace/grace_h_cajgar.png"
    graceBody.src = "../img/grace/grace_body.png"
    whisker.src = "../img/grace/whisker.png"
    engraving.src = "../img/grace/engraving5.png"
    clock.src = "../img/grace/clock5.png"
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
    engraving.scaledHeight = engraving.height * initialEngravingScale;
    engraving.scaledWidth = engraving.width * initialEngravingScale;

    // scale
    if(ctx.canvas.width <= ctx.canvas.height) {
        scale = ctx.canvas.width/clock.width;
    } else {
        scale = ctx.canvas.height/clock.height;
    }

    clock.scaledWidth = clock.width * scale;
    clock.scaledHeight = clock.height * scale;

    graceBody.scaledWidth = graceBody.scaledWidth * scale;
    graceBody.scaledHeight = graceBody.scaledHeight * scale;
    graceHead.scaledWidth = graceHead.scaledWidth * scale;
    graceHead.scaledHeight = graceHead.scaledHeight * scale;
    whisker.scaledWidth = whisker.scaledWidth * scale;
    whisker.scaledHeight = whisker.scaledHeight * scale;
    engraving.scaledHeight = engraving.scaledHeight * scale;
    engraving.scaledWidth = engraving.scaledWidth * scale;

    // ---- DRAWING -----------------------

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    //bakground color
    ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#ffe6e6";
    ctx.fill();

    // move to the center of the canvas
    ctx.translate(ctx.canvas.width/2, ctx.canvas.height/2);

    // clock face
    ctx.drawImage(clock,
        -clock.scaledWidth/2,
        -clock.scaledHeight/2,
        clock.scaledWidth,
        clock.scaledHeight);

    // engraving
    ctx.drawImage(engraving,
        -engraving.scaledWidth/2,
        -engraving.scaledHeight/2 - 380*initialEngravingScale*scale,
        engraving.scaledWidth,
        engraving.scaledHeight);    

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
            engravingVersion = engravingVersion <= 2 ? 3 : engravingVersion;
        } else {
            engravingVersion++;
            engravingVersion = engravingVersion >= 7 ? 6 : engravingVersion;
        }

        engraving.src = "../img/grace/engraving" + engravingVersion + ".png"

    } else {
        if(e.deltaY > 0) {
            clockVersion--
            clockVersion = clockVersion <= 0 ? 1 : clockVersion;
        } else {
            clockVersion++;
            clockVersion = clockVersion >= 6 ? 5 : clockVersion;
        }

        clock.src = "../img/grace/clock" + clockVersion + ".png"
    }
}

init();