{
  let elem = document.createElement("title");
  elem.innerHTML = "Boids";
  document.head.appendChild(elem);
}

let n = 200, r = 100, maxF = 0.2, maxS = 5;
let boids = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  boids = new Array(n);
  for(let i = 0; i < boids.length; i++) {
    boids[i] = new Boid();
  }
}

function draw() {
  background(0);
  noFill();

  for(let i = 0; i < boids.length; i++) {
    boids[i].update(boids, i);
    boids[i].render();
  }
}

class Boid {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
  }

  update(boids, num) {
    this.pos.add(this.vel);
    this.vel.add(this.acc).limit(maxS);
    this.pos.x = modulo(this.pos.x, width);
    this.pos.y = modulo(this.pos.y, height);

    // Separation
    let meanPush = createVector();
    let no = 0;
    for(let i = 0; i < boids.length; i++) {
      if(num == i) { continue; }
      let v = p5.Vector.dist(this.pos, boids[i].pos);
      if(v < r) {
        meanPush.add(p5.Vector.sub(this.pos, boids[i].pos).div(v*v));
      }
    }
    if(no > 0) {
      meanPush.div(no);
      meanPush.setMag(maxS);
      meanPush.sub(this.vel);
      meanPush.limit(maxF);
    }
    this.acc = meanPush;

    // Alignment
    let steer = createVector();
    no = 0;
    for(let i = 0; i < boids.length; i++) {
      if(num == i) { continue; }
      if(p5.Vector.dist(this.pos, boids[i].pos) < r) {
        steer.add(boids[i].vel);
        no++;
      }
    }
    if(no > 0) {
      steer.div(no).setMag(maxS);
      steer.sub(this.vel);
    }
    this.acc.add(steer.limit(maxF));

    // Cohesion
    let meanPos = createVector();
    no = 0;
    for(let i = 0; i < boids.length; i++) {
      if(num == i) { continue; }
      if(p5.Vector.dist(this.pos, boids[i].pos) < 100) {
        meanPos.add(boids[i].pos);
        no++;
      }
    }
    if(no > 0) {
      meanPos.div(no);
      meanPos.sub(this.pos);
      meanPos.sub(this.vel);
    }
    this.acc.add(meanPos.limit(maxF));
  }

  render() {
    push();
    translate(this.pos.x, this.pos.y);
    // Sightlines
    // stroke(255, 0, 0);
    // line(0, 0, 10 * this.vel.x, 10 * this.vel.y);
    // line(0, 0, 10 * this.acc.x, 10 * this.acc.y);

    // Perception radius
    // stroke(0, 255, 0);
    // ellipse(0, 0, 2 * r);

    // Arrowheads
    // rotate((PI/2) + this.vel.heading());
    // stroke(255);
    // line(0, -10, 6, 10);
    // line(6, 10, 0, 4);
    // line(0, -10, -6, 10);
    // line(-6, 10, 0, 4);

    // Circles
    stroke(255/2);
    fill(255);
    ellipse(0, 0, 10);
    pop();
  }
}
