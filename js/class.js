class Spaceship{
  constructor(x, y, angle){
    this.x = x;
    this.y = y;
    this.angle = angle;
  }

  draw(){
    let cos = Math.cos(this.angle);
    let sin = Math.sin(this.angle);
    ctx.beginPath();
    ctx.moveTo(this.x,this.y);
    ctx.lineTo(15*cos -45*sin + this.x, 45*cos + 15*sin + this.y);
    ctx.lineTo(30*cos + this.x, 30*sin + this.y);
    ctx.lineTo(this.x,this.y);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
  }

  move(){
    let cos = Math.cos(this.angle);
    let sin = Math.sin(this.angle);
    this.x = this.x - 10*sin;
    this.y = this.y + 10*cos;

    if(this.x < 0){
      this.x = 1000;
    }
    else if (this.x > 1000){
      this.x = 0;
    }

    if(this.y < 0){
      this.y = 700;
    }
    else if (this.y > 700){
      this.y = 0;
    }
  }

  rotate(side){
    this.angle += side*(0.1);
  }

  shoot(){
    var rocket = new Rocket(this.x, this.y, this.angle);
    rocketArray.push(rocket);
  }
}

class Rocket{
  constructor(x,y,angle){
    this.x = x;
    this.y = y;
    this.angle = angle;
  }

  draw(){
      ctx.beginPath();
      ctx.arc(this.x, this.y, 6, 0, Math.PI*2);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.closePath();
  }
  move(){
    let cos = Math.cos(this.angle);
    let sin = Math.sin(this.angle);
    this.x = 15*cos + 25*sin + this.x + 15;
    this.y = 65*cos - 15*sin + this.y + 30;

    if (this.x < 0 || this.x > 1000 || this.y < 0 || this.y > 700){
      this.die();
    }
  }

  die(){
    var index = rocketArray.indexOf(this);
    rocketArray.splice(index,1);
  }


}//fin de Rocket
