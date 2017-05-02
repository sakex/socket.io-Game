let game;
const socket = io.connect();

function spaceDraw(x, y, angle, color){
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  ctx.beginPath();
  ctx.moveTo(x,y);
  ctx.lineTo(15*cos -45*sin + x, 45*cos + 15*sin + y);
  ctx.lineTo(30*cos + x, 30*sin + y);
  ctx.lineTo(x,y);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function rocketDraw(x, y, angle){
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}


socket.on("update", function(update){
  game = update;
});


const canvas = document.getElementById('jeu');
const ctx = canvas.getContext('2d');


let keyState = {};
window.addEventListener('keydown', function(e){
  keyState[e.which] = true;
}, true);
window.addEventListener('keyup', function(e){
  keyState[e.which] = false;
}, true);

let amo = true;

$("body").on('keydown', function(e){
  if(e.which === 32){
      if(amo) socket.emit("shoot");
      amo = false;
  }
});

$("body").on('keyup', function(e){
  if(e.which === 32){
      amo = true;
  }
});

setInterval(function(){
    if(keyState[65] || keyState[37]){
      socket.emit("rotate", -1);
    }
    if(keyState[68] || keyState[39]){
      socket.emit("rotate", 1);
    }
    if(keyState[87] || keyState[38]){
      socket.emit("move");
    }

    ctx.clearRect(0, 0, 1000, 700);

    for(i in game.spaceships){
      spaceDraw(game.spaceships[i].x, game.spaceships[i].y, game.spaceships[i].angle, game.spaceships[i].color);
    }

    for(i in game.rockets){
      rocketDraw(game.rockets[i].x, game.rockets[i].y, game.rockets[i].angle);
    }


  },33);
