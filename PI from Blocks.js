{
    var elem = document.createElement("title");
    elem.innerHTML = "Pi from Blocks";
    document.head.appendChild(elem);
}

let digits = 3, count = 0, clack, slow;
let b1, b2;

function preload() {
    clack = loadSound('Clack.wav');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    slow = 2.5 ** (digits - 1);

    b1 = new block(100, 0, 1, 0, 1);
    b2 = new block(300, 103, 100 ** (digits - 1), -1 / slow, digits);
}

function draw() {
    background(0);
    stroke(255);
    noFill();

    b1.update();
    b2.update();

    if(b2.collision(b1)) {
        let vel1 = ((b1.mass - b2.mass) / (b1.mass + b2.mass)) * b1.vel + ((2 * b2.mass) / (b1.mass + b2.mass)) * b2.vel;
        b2.vel = ((b2.mass - b1.mass) / (b1.mass + b2.mass)) * b2.vel + ((2 * b1.mass) / (b1.mass + b2.mass)) * b1.vel;
        b1.vel = vel1;
        clack.play();
    }
    if(b1.hitWall()) {
        clack.play();
    }
    b1.show();
    b2.show();
}

class block {
    constructor(x, xCon, mass, vel, size) {
        this.x = x;
        this.xCon = xCon;
        this.mass = mass;
        this.vel = vel;
        this.size = 100 * size;
    }

    show() {
        if(this.x < this.xCon) {
            rect(this.xCon, height - (this.size + 50), this.size, this.size);
        } else {
            rect(this.x, height - (this.size + 50), this.size, this.size);
        }
    }

    update() {
        this.x += this.vel;
    }

    collision(other) {
        if(this.x <= other.x + other.size) {
            count++;
            return true;
        }
    }

    hitWall() {
        if(this.x <= 0) {
            this.vel *= -1;
            count++;
            return true;
        }
        return false;
    }
}