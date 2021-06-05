let board;
let next;
let cols, rows;
let w = 10;

function setup() {
    createCanvas(windowWidth, windowHeight);
    cols = floor(width / w);
    rows = floor(height / w);
    board = new Array(cols);
    next = new Array(cols);
    for (let i = 0; i < board.length; i++) {
        board[i] = new Array(rows);
        next[i] = new Array(rows);
    }
    init();
    frameRate(10);
}

function draw() {
    background(0);
    stroke(200);
    // grid();
    stroke(0);
    fill(0);
    show();
    update();
}

function grid() {
    for (let i = 0; i < width / w; i++) {
        line(i * w, 0, i * w, height);
    }
    for (let i = 1; i < height / w; i++) {
        line(0, i * w, width, i * w);
    }
}

function init() {
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            if (x == 0 || y == 0 || x == board.length - 1 || y == board[x].length - 1) {
                board[x][y] = 0;
            } else {
                let k = floor(random(2));
                board[x][y] = k;
            }
        }
    }
}

function show() {
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            if (board[x][y] == 1) {
                stroke(255, (255 / (board.length + board[x].length) * (x + y)), 255 - (255 / (board.length + board[x].length) * (x + y)));
                fill(255, (255 / (board.length + board[x].length) * (x + y)), 255 - (255 / (board.length + board[x].length) * (x + y)));
                rect((x * w) + 1, (y * w) + 1, w - 1, w - 1);
            }
        }
    }
}

function update() {
    for (let x = 1; x < board.length - 1; x++) {
        for (let y = 1; y < board[x].length - 1; y++) {
            let n = 0;
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    n += board[x + i][y + j];
                }
            }
            n -= board[x][y];

            if ((board[x][y] == 1) && (n < 2)) {
                next[x][y] = 0; // Underpopulation
            } else if ((board[x][y] == 1) && (n > 3)) {
                next[x][y] = 0; // Overpopulation
            } else if ((board[x][y] == 0) && (n == 3)) {
                next[x][y] = 1; // Reproduction
            } else {
                next[x][y] = board[x][y]; // Stasis
            }
        }
    }
    let temp = board;
    board = next;
    next = temp;
}

function mousePressed() {
    init();
}
