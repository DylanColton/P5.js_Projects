let Collatz = [];
let rot, forward;

function setup()
{
    rot = PI/20;
    forward = 10;
    Collatz = new Array(1000000);
    for(let i = 0; i < Collatz.length; i++)
    {
        Collatz[i] = collatzToOneness(i+5);
        Collatz[i] = reverse(Collatz[i]);
    }

    createCanvas(windowWidth, windowHeight);
    // frameRate(5);
    background(0);
}

let i = 0;

function draw()
{
    translate(width/2, height);
    strokeWeight(2);

    for(let j = 0; j < Collatz[i].length; j++) {
        if(Collatz[i][j] % 2 == 0) { rotate(-rot); }
        else { rotate(rot); }

        stroke(255, 255 - (255/(Collatz[i].length)) * j, (255/(Collatz[i].length)) * j, 50);
        line(0, 0, 0, -forward);
        translate(0, -forward);
    }

    i++;
    if(i == Collatz.length) {
        noLoop();
    }
}

function collatz(a)
{
  if(a % 2 == 1) {
    a =  3 * a + 1;
  }
  return a/2;
}

function collatzToOneness(b)
{
    let l = [];
    l.push(b);

    while (b != 1)
    {
        b = collatz(b);
        l.push(b);
    }

    return l;
}
