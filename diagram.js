//In order to enter analysis mode, add #analysis to the end of your URL. 

var init = function(){
//Create Canvas
$( document.body ).append( "<canvas id=\"myCanvas\" width=\"100vw\" height=\"100vh\" style=\"position:absolute; background-color:blue; top:0px; left:0px;\"></canvas>" );

// create some object to save all pressed keys
var keys = {
    shift: false,
    ctrl: false,
    arrow: false
};
var arrowX = 0; 
var arrowY = 0; 
$(document.body).keydown(function(event) {
// save status of the button 'pressed' == 'true'
    if (event.keyCode == 16) {
        keys["shift"] = true;
    } 
});

$(document.body).keyup(function(event) {
    // reset status of the button 'released' == 'false'
    if (event.keyCode == 16) {
        keys["shift"] = false;
    } 
});
$('#myCanvas').bind("contextmenu",function(e){
   return false;
});
$('#myCanvas').mousedown(function(event) {

    switch (event.which) {
        case 1:
        	if(keys["shift"]){
        		drawArrow(event, event.pageX, event.pageY); 
        	}
        	else{
        		keys['arrow'] = false;
            	drawCircle(event.pageX, event.pageY);
            }
            break;
        case 2:
            alert('Middle Mouse button pressed.');
            break;
        case 3:
        	clearCanvas(); 
            break;
        default:
            alert('You have a strange Mouse!');
    }
});
function drawCircle(x, y){
	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	ctx.beginPath();
	ctx.arc(x,y,50,0,2*Math.PI);
	ctx.strokeStyle = 'green';
	ctx.lineWidth = 5;
	ctx.stroke();
}
function drawArrow(e, x, y){
    //var offset = $(this).offset();
    keys['arrow'] = true; 
    arrowX = x; 
    arrowY = y; 
    var p1 = [x, y];
    var p2 = [e.pageX, e.pageY];

    ctx.clearRect(0, 0, 400, 400);
    arrow(p1, p2);
}
function clearCanvas(){
	var c = document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);
	return false;
}

	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext('2d');

function arrow(p1, p2) {

    ctx.save();
    var dist = Math.sqrt((p2[0] - p1[0]) * (p2[0] - p1[0]) + (p2[1] - p1[1]) * (p2[1] - p1[1]));

    ctx.beginPath();
    ctx.lineWidth = 15;
    ctx.strokeStyle = 'green';
    ctx.moveTo(p1[0], p1[1]);
    ctx.lineTo(p2[0], p2[1]);
    ctx.stroke();

    var angle = Math.acos((p2[1] - p1[1]) / dist);

    if (p2[0] < p1[0]) angle = 2 * Math.PI - angle;

    var size = 15;

    ctx.beginPath();
    ctx.translate(p2[0], p2[1]);
    ctx.rotate(-angle);
    ctx.fillStyle = 'green';
    ctx.lineWidth = 15;
    ctx.strokeStyle = 'green';
    ctx.moveTo(0, -size);
    ctx.lineTo(-size, -size);
    ctx.lineTo(0, 0);
    ctx.lineTo(size, -size);
    ctx.lineTo(0, -size);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

$('#myCanvas').bind('mousemove', function (e) {
	// if(keys['shift'] === false){
	// 	clearCanvas(); 
	// }
	if(keys['arrow'] && keys['shift']){
		clearCanvas();
		var p1 = [arrowX, arrowY];
	    var p2 = [e.pageX, e.pageY];

	    ctx.clearRect(0, 0, 400, 400);
	    arrow(p1, p2);
	}
}) 
}

//Check if user is in analysis mode. 
var url = window.location.href; 
var result = url.indexOf("#analysis");
if(result > -1){
    init(); 
}