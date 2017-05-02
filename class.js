class Spaceship{
  constructor(x, y, angle, color){
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.color = color;
    this.live = true;
  }

  move(){
    const cos = Math.cos(this.angle);
    const sin = Math.sin(this.angle);
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

  points(){
    const cos = Math.cos(this.angle);
    const sin = Math.sin(this.angle);

    return [[this.x, this.y], [15*cos -45*sin + this.x, 45*cos + 15*sin +this.y], [30*cos + this.x, 30*sin + this.y]];

  }

  rotate(side){
    this.angle += side*(0.1);
  }

} // Fin spaceship

class Rocket{
  constructor(x, y, angle){
    this.x = x;
    this.y = y;
    this.angle = angle;
  }
  move(){
    let cos = Math.cos(this.angle);
    let sin = Math.sin(this.angle);
    this.x = this.x - 20*sin;
    this.y = this.y + 20*cos;

    if (this.x < 0 || this.x > 1000 || this.y < 0 || this.y > 700){
      this.die(this);
    }
  }

}//fin de Rocket


module.exports = {
        Spaceship: Spaceship,
        Rocket: Rocket,
    };
