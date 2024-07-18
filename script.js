Number.prototype.clamp = function(min, max) {
  return this < min ? min : (this > max ? max : this);
};
//variables
var gameview = function(){
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var img = document.getElementById("HAHAHAHA")
var width = window.innerWidth;
var height = window.innerHeight;
var player_x = 0;
var player_y = 0;
//var player_jump = false;
var player_jump = 0;
var money = 0;
var k_w = false;
var k_a = false;
var k_s = false;
var k_d = false;
var spacebar = false;
var player_w = 30;
var player_h = 30;
var player_color = "red";
var player_maxspeed = 6;
var velx = 0;
var vely = 0;
var friction = .9;
var gravity = .5;
var keys = [];
canvas.width = width;
canvas.height = height;
var plats1 = [
[100,300,100,20], 
[400,200,100,20], 
[750,100,100,20]
];
var plats2 = [
[200,200,100,20], 
[100,350,100,20],
[200,500,100,20]
];
var plats3 = [

];
var plats = [];
//[x, y, w, h], x, y is top left corner
//[190,30,20,20]
var door = [790,50,20,20];
var level = 1;
//gempleh
(function update (){
  if (level === 1) {
	  plats = plats1;
	  door = [790,50,20,20];
  }
  if (level === 2) {
	  plats = plats2;
	  door = [190,30,20,20];
  }   
  if (level === 3) {
	  plats = plats3;
  }
  //keycheck
  //d
  if (keys[68]){
    if (velx < player_maxspeed){
      velx = velx+1;
    }
  }
  //a
  if (keys[65]){
    if (velx > -player_maxspeed){
      velx = velx-1;
    }
  }  
  //jump
  if (keys[87]){
    if(player_jump>0 && vely > -player_maxspeed) {
      player_jump -=1;
      vely = -player_maxspeed * 2;
    }
  }  
  //Physics
  velx = velx * friction;
  vely = vely + gravity;
  player_x = player_x + velx;
  player_y = player_y + vely;
  //door collision
  if((Math.abs(player_x - door[0]) < 20) && (Math.abs(player_y - door[1] ) < 20)){
	level = level + 1;
	player_x = 0;
	player_y = 0;
  }
  //boundaries
  player_x = player_x.clamp(0, width - player_w);
  player_y = player_y.clamp(0, height - 55);
  //ready to jump
  if (player_y >= height - 55) {
    player_jump = 2;
  }
  //platform collision
  for(var i = 0; i < plats.length; i++){
	var plat = plats[i];
	if (player_y < plat[1] + player_h){
		if (player_x + player_w > plat[0] && player_x < plat[0] + plat[2] && player_y + vely >  plat[1] - player_h){
			if (vely > 0){
				player_y = player_y.clamp(-50, plat[1] - player_h);
				player_jump = 2;
				vely = 0
			}
		}
	}	
  }
  
  //draw
  ctx.clearRect(0, 0, width, height);
  
  //drawplatforms
  for(var i = 0; i < plats.length; i++){
	ctx.fillstyle = "black";
	ctx.fillRect(plats[i][0], plats[i][1], plats[i][2], plats[i][3]);
  }
  
  ctx.fillstyle = player_color;
  ctx.fillRect(door[0], door[1], door[2], door[3]);
  ctx.drawImage(img, player_x, player_y)
  setTimeout(update, 1000 / 60);
  console.log(level)
}());

document.onkeydown = document.onkeyup = function(e) {
  keys[e.keyCode] = e.type === "keydown";
};
};
setTimeout(gameview, 1);
//shop
//shotgun
//doublejump
//dash