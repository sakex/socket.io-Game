var express = require('express') //Permet de naviguer parmi les fichiers
var app = new express()
var server= require('http').createServer(app); //Permet de créer le serveur
var io = require('socket.io').listen(server);  //Permet l'interraction avec le serveur
var jeu = require('/home/pi/nodegame/class.js');
var collide = require('triangle-circle-collision');


(function(){ //IIFE

  function Game(){
    this.spaceships = [];
    this.rockets = [];
  }

  var game = new Game();
  //console.log(game.spaceships);

  jeu.Spaceship.prototype.die = function(){
    this.live = false;
    var index = game.spaceships.indexOf(this);
    game.spaceships.splice(index, 1);
  };

  jeu.Rocket.prototype.die = function(){
    var index = game.rockets.indexOf(this);
    game.rockets.splice(index, 1);
  };

  app.get("/", function(req, res){
    res.render("page.ejs");
  });

  app.get("/js/:script", function(req, res){
    res.sendFile(__dirname + "/js/" +req.params.script);
  });

  setInterval(function(){
    var triangles = [];
    for(j in game.spaceships){
      triangles.push(game.spaceships[j].points());
    }

    for(i in game.rockets){
      game.rockets[i].move();
    }


    for(i in game.rockets){
      for(j in triangles){
        if(collide(triangles[j], [game.rockets[i].x, game.rockets[i].y], 6)){
          //console.log(j);
          game.rockets[i].die();
          game.spaceships[j].die();
          break;
        }
      }
    }


    io.emit("update", game);
  }, 33);



  io.on("connection", function(socket){
    let newSS = new jeu.Spaceship(Math.random()*1000, Math.random()*700, Math.PI, getRandomColor());
    game.spaceships.push(newSS);

    socket.on("move", function(){
      if(newSS.live) newSS.move();
    });

    socket.on("rotate", function(val){
      if(newSS.live) newSS.rotate(val);
    });

    socket.on("shoot", function(){
      if(newSS.live){
        const cos = Math.cos(newSS.angle);
        const sin = Math.sin(newSS.angle);
        let rocket = new jeu.Rocket(15*cos -66*sin + newSS.x, 66*cos + 15*sin + newSS.y, newSS.angle);
        game.rockets.push(rocket);
      }
    });

  });

  function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
  }


}()); // FIN IIFE

server.listen("3001");
console.log("Bring Yourself Back Online");
