var graceHead = new Image();
var graceBody = new Image();
var whisker = new Image();
var clock1 = new Image();
var clock2 = new Image();

function init() {
    graceHead.src = "../img/grace/grace_h_cajgar.png"
    graceBody.src = "../img/grace/grace_body.png"
    whisker.src = "../img/grace/whisker.png"
    clock1.src = "../img/grace/clock1.png"
    clock2.src = "../img/grace/clock2.png"
    window.requestAnimationFrame(draw);
}

function draw() {
    var now = new Date();
    var sec = now.getSeconds();
    var min = now.getMinutes();
    var hr  = now.getHours();
    hr = hr >= 12 ? hr - 12 : hr;

    var ctx = document.getElementById('canvas').getContext('2d');

    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    //bakground color
    ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#d6f5f5";
    ctx.fill();

    // ctx.rotate(-Math.PI / 2);

    // move to the center of the canvas
    ctx.translate(ctx.canvas.width/2, ctx.canvas.height/2);

    ctx.drawImage(clock1, -clock1.width/2, -clock1.height/2);
    // ctx.drawImage(clock2, -clock2.width/2, -clock2.height/2);

    // ctx.rotate(-Math.PI / 2)

    // minutes - body
    ctx.save();
    ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
    ctx.drawImage(graceBody, -graceBody.width/2 + 100, -graceBody.height/2 - 580);
    ctx.restore();

    // hours - head
    ctx.rotate(hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) *sec);
    ctx.lineWidth = 14;
    ctx.drawImage(graceHead, -graceHead.width/2 - 110, -graceHead.height/2 - 70);
     
    // Write seconds
    ctx.translate(175, 50);
    ctx.rotate(sec * Math.PI / 30);
    ctx.drawImage(whisker, -whisker.width/2, -whisker.height + 5);

    // ctx.beginPath();
    // ctx.arc(0, 0, 10, 0, 2 * Math.PI);
    // ctx.fillStyle = "red";
    // ctx.fill();

    window.requestAnimationFrame(draw);
}

init();