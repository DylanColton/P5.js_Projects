{
    var elem = document.createElement("Title");
    elem.innerHTML = "Hilbert Curve";
    document.head.appendChild(elem);
}

let depth = 7, d = 2, hilStr = "U", s = "", curPos, mov;

let cupsPartiDecomp = { "U": "LdUrUuR", "L": "UrLdLlD", "D": "RuDlDdL", "R": "DlRuRrU" },
    cupsFinalDecomp = { "U": "dru", "L": "rdl", "D": "uld", "R": "lur" };

function setup() {
    createCanvas(800, 800);
    noFill();
    stroke(255);

    while (d++ <= depth) {
        hilStr = partiallyDecomposeHilStr(hilStr);
    }
    
    s = executeHilStr(hilStr);
    background(0);

    curPos = [width / (2 ** (depth + 1)), height / (2 ** (depth + 1))], mov = [width / (2 ** depth), height / (2 ** depth)];

    // Segmentation
    stroke(255 / 4);
    // for(let i = 0; i <= 2 ** depth; i++) {
    //     line(0, (height * (i + 1)) / (2 ** depth), width, (height * (i + 1)) / (2 ** depth));
    //     line((width * (i + 1)) / (2 ** depth), 0, (width * (i + 1)) / (2 ** depth), height);
    // }
}

function draw() {
    stroke(255 * ((frameCount-1) / s.length), 0, 255 * (1 - ((frameCount-1) / s.length)));

    switch (s[frameCount - 1]) {
        case "u":
            line(curPos[0], curPos[1], curPos[0], curPos[1] - mov[1]);
            curPos[1] -= mov[1];
            break;

        case "l":
            line(curPos[0], curPos[1], curPos[0] - mov[0], curPos[1]);
            curPos[0] -= mov[0];
            break;

        case "d":
            line(curPos[0], curPos[1], curPos[0], curPos[1] + mov[1]);
            curPos[1] += mov[1];
            break;

        case "r":
            line(curPos[0], curPos[1], curPos[0] + mov[0], curPos[1]);
            curPos[0] += mov[0];
            break;
    }

    if (frameCount >= s.length) {
        noLoop();
    }
}

function executeHilStr(hilStr) {
    let s = "";

    for (let a of hilStr) {
        if (cupsFinalDecomp[a]) {
            s += cupsFinalDecomp[a];
        } else {
            s += a;
        }
    }

    let curPos = [width / (2 ** (depth + 1)), height / (2 ** (depth + 1))], mov = [width / (2 ** depth), height / (2 ** depth)];
    for (let i = 0; i < s.length; i++) {
        stroke(255 * (i / s.length), 0, 255 * (1 - (i / s.length)));

        switch (s[i]) {
            case "u":
                line(curPos[0], curPos[1], curPos[0], curPos[1] - mov[1]);
                curPos[1] -= mov[1];
                break;

            case "l":
                line(curPos[0], curPos[1], curPos[0] - mov[0], curPos[1]);
                curPos[0] -= mov[0];
                break;

            case "d":
                line(curPos[0], curPos[1], curPos[0], curPos[1] + mov[1]);
                curPos[1] += mov[1];
                break;

            case "r":
                line(curPos[0], curPos[1], curPos[0] + mov[0], curPos[1]);
                curPos[0] += mov[0];
                break;
        }
    }

    return s;
}

function partiallyDecomposeHilStr(hilStr) {
    let s = "";

    for (let a of hilStr) {
        if (cupsPartiDecomp[a]) {
            s += cupsPartiDecomp[a];
        } else {
            s += a;
        }
    }

    return s;
}

function decomposeHilStrToDepth(hilStr, depth, d = 0) {
    while (d++ <= depth) {
        hilstr = partiallyDecomposeHilStr(hilStr);
    }

    return hilStr;
}