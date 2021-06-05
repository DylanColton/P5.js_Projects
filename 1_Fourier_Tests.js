{
    var elem = document.createElement("title");
    elem.innerHTML = "Fourier Series";
    document.head.appendChild(elem);
}

let n = 300, freq = 1.5, amp = 25, theta = 0;
let sinCir = [], cosCir = [];
let sinTrail = [], cosTrail = [], sincosTrail = [];

// The following six functions need to be altered in accordance to the math of the Fourier Series, do not mess with the code in the function unless you understand the math behind the Fourier Series' coeffs
// The first three govern the coeffs and fractions of the sines
// The second three govern the coeffs and fractions of the cosines
function sinCoeff(n) {
    return ((2 * n) + 1);
}

function sinNum(n) {
    return 8 * ((-1) ** (((2 * n + 1) - 1) / 2));
}

function sinDenom(n) {
    return (PI * ((2 * n) + 1)) ** 2;
}

function cosCoeff(n) {
    return (2 * n) + 1;
}

function cosNum(n) {
    return 4;
}

function cosDenom(n) {
    return PI * ((2 * n) + 1);
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    sinCir = new Array(n);
    cosCir = new Array(n);
    for(let i = 0; i < n; i++) {
        sinCir[i] = [0, 0, sinCoeff(i), sinNum(i), sinDenom(i)];
        cosCir[i] = [0, 0, cosCoeff(i), cosNum(i), cosDenom(i)];
    }

    for(let i = 0; i < sinCir.length; i++) {
        if(sinCir[i][2] == 0) {
            sinCir.splice(i, 1);
        }
    }
    for(let i = 0; i < cosCir.length; i++) {
        if(cosCir[i][2] == 0) {
            cosCir.splice(i, 1);
        }
    }
}

function draw() {
    background(0);
    strokeWeight(1);
    for(let i = 1; i < 6; i++) {
      stroke(255 * ((1/3) + (2/3) * ((i+1)%2)));
      line(0, (height * i) / 6, width, (height * i) / 6);
    }
    stroke(255);
    noFill();

    // Sines

    translate(150, height / 6);
    strokeWeight(1);
    for(let i = 0; i < sinCir.length; i++) {
        if(i > 0) {
            sinCir[i][0] = (sinCir[i-1][3] / sinCir[i-1][4]) * amp * cos((theta * sinCir[i-1][2]) / freq) + sinCir[i-1][0];
            sinCir[i][1] = (sinCir[i-1][3] / sinCir[i-1][4]) * amp * sin((theta * sinCir[i-1][2]) / freq) + sinCir[i-1][1];
        }
        ellipse(sinCir[i][0], sinCir[i][1], 2 * amp * (sinCir[i][3] / sinCir[i][4]));
        if(i == sinCir.length - 1) {
            strokeWeight(5);
            point((sinCir[i][3] / sinCir[i][4]) * amp * cos((theta * sinCir[i][2]) / freq) + sinCir[i][0], (sinCir[i][3] / sinCir[i][4]) * amp * sin((theta * sinCir[i][2]) / freq) + sinCir[i][1]);
        }
    }
    point(150, (sinCir[sinCir.length-1][3] / sinCir[sinCir.length-1][4]) * amp * sin((theta * sinCir[sinCir.length-1][2]) / freq) + sinCir[sinCir.length-1][1]);
    strokeWeight(1);
    sinTrail.unshift((sinCir[sinCir.length-1][3] / sinCir[sinCir.length-1][4]) * amp * sin((theta * sinCir[sinCir.length-1][2]) / freq) + sinCir[sinCir.length-1][1]);
    if(sinTrail.length > width - 150) {
        sinTrail.pop();
    }
    beginShape();
    for(let i = 0; i < sinTrail.length; i++) {
        vertex(150 + i, sinTrail[i]);
    }
    endShape();

    // Cosines
    translate(0, 2 * height / 6);
    strokeWeight(1);
    for(let i = 0; i < cosCir.length; i++) {
        if(i > 0) {
            cosCir[i][0] = (cosCir[i-1][3] / cosCir[i-1][4]) * amp * sin((theta * cosCir[i-1][2]) / freq) + cosCir[i-1][0];
            cosCir[i][1] = (cosCir[i-1][3] / cosCir[i-1][4]) * amp * cos((theta * cosCir[i-1][2]) / freq) + cosCir[i-1][1];
        }
        ellipse(cosCir[i][0], cosCir[i][1], 2 * amp * (cosCir[i][3] / cosCir[i][4]));
        if(i == cosCir.length - 1) {
            strokeWeight(5);
            point((cosCir[i][3] / cosCir[i][4]) * amp * sin((theta * cosCir[i][2]) / freq) + cosCir[i][0], (cosCir[i][3] / cosCir[i][4]) * amp * cos((theta * cosCir[i][2]) / freq) + cosCir[i][1]);
        }
    }
    point(150, (cosCir[cosCir.length-1][3] / cosCir[cosCir.length-1][4]) * amp * cos((theta * cosCir[cosCir.length-1][2]) / freq) + cosCir[cosCir.length-1][1]);
    strokeWeight(1);
    cosTrail.unshift((cosCir[cosCir.length-1][3] / cosCir[cosCir.length-1][4]) * amp * cos((theta * cosCir[cosCir.length-1][2]) / freq) + cosCir[cosCir.length-1][1]);
    if(cosTrail.length > width - 150) {
        cosTrail.pop();
    }
    beginShape();
    for(let i = 0; i < cosTrail.length; i++) {
        vertex(150 + i, cosTrail[i]);
    }
    endShape();

    // Sines + Cosines
    translate(0, 2 * height / 6);
    for(let i = 0; i < sinCir.length; i++) {
        ellipse(sinCir[i][0], sinCir[i][1], 2 * amp * (sinCir[i][3] / sinCir[i][4]));
        if(i == sinCir.length - 1) {
            strokeWeight(5);
            point((sinCir[i][3] / sinCir[i][4]) * amp * cos((theta * sinCir[i][2]) / freq) + sinCir[i][0], (sinCir[i][3] / sinCir[i][4]) * amp * sin((theta * sinCir[i][2]) / freq) + sinCir[i][1]);
        }
    }
    strokeWeight(1);
    for(let i = 0; i < cosCir.length; i++) {
        ellipse(cosCir[i][0], cosCir[i][1], 2 * amp * (cosCir[i][3] / cosCir[i][4]));
        if(i == cosCir.length - 1) {
            strokeWeight(5);
            point((cosCir[i][3] / cosCir[i][4]) * amp * sin((theta * cosCir[i][2]) / freq) + cosCir[i][0], (cosCir[i][3] / cosCir[i][4]) * amp * cos((theta * cosCir[i][2]) / freq) + cosCir[i][1]);
        }
    }
    point(150, (sinCir[sinCir.length-1][3] / sinCir[sinCir.length-1][4]) * amp * sin((theta * sinCir[sinCir.length-1][2]) / freq) + sinCir[sinCir.length-1][1] + 
    (cosCir[cosCir.length-1][3] / cosCir[cosCir.length-1][4]) * amp * cos((theta * cosCir[cosCir.length-1][2]) / freq) + cosCir[cosCir.length-1][1]);
    strokeWeight(1);
    sincosTrail.unshift((sinCir[sinCir.length-1][3] / sinCir[sinCir.length-1][4]) * amp * sin((theta * sinCir[sinCir.length-1][2]) / freq) + sinCir[sinCir.length-1][1] + 
    (cosCir[cosCir.length-1][3] / cosCir[cosCir.length-1][4]) * amp * cos((theta * cosCir[cosCir.length-1][2]) / freq) + cosCir[cosCir.length-1][1]);
    if(sincosTrail.length > width - 150) {
        sincosTrail.pop();
    }
    beginShape();
    for(let i = 0; i < sincosTrail.length; i++) {
        vertex(150 + i, sincosTrail[i]);
    }
    endShape();

    theta -= PI / 50;
}