const gridContainer = document.querySelector('.container');
let gridBox;
let mouseoverBox = fillBox;
let numSquares = 4096; /* Default grid is 64x64 */
makeGrid();

const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', makeGrid);

const resizeButton = document.querySelector('#resize');
resizeButton.addEventListener('click', resizeBox);

const blackButton = document.querySelector('#black');
blackButton.addEventListener('click', changeToBlack);

const rainbowButton = document.querySelector('#rainbow');
rainbowButton.addEventListener('click', changeToRainbow);

const grayscaleButton = document.querySelector('#grayscale');
grayscaleButton.addEventListener('click', changeToGrayscale);

function makeGrid() {
    gridContainer.textContent = '';
    for(i = 0; i < numSquares; i++) {
        gridBox = document.createElement('div');
        gridBox.classList.add('gridBox');
        gridContainer.appendChild(gridBox);
    }
    const gridBoxes = Array.from(document.querySelectorAll('.gridBox'));
    gridBoxes.forEach(gridBox => gridBox.addEventListener('mouseover', mouseoverBox));
}

function changeToRainbow() {
    mouseoverBox = fillRainbow;
    makeGrid();
}

function fillBox(e) {
    e.target.classList.replace('gridBox', 'filledBox');
}

function changeToBlack() {
    mouseoverBox = fillBox;
    makeGrid();
}

function changeToGrayscale() {
    mouseoverBox = fillGrayscale;
    makeGrid();
}

function fillRainbow(e) { 
    const randR = Math.floor(Math.random() * 255);
    const randG = Math.floor(Math.random() * 255);
    const randB = Math.floor(Math.random() * 255);
    e.target.style.backgroundColor = `rgb(${randR}, ${randG}, ${randB})`;
}

function fillGrayscale(e) {
    let grayness = Number(this.style.backgroundColor.slice(-4, -1));
    if (grayness < 1) {
        grayness += .1;
        this.style.backgroundColor = `rgb(0, 0, 0, ${grayness})`;
    } else {
        return;
    }
}

function resizeBox() {
    let numAcross = prompt('How many squares across should the box be? Max 100');
    if (numAcross > 100) {
        numAcross = 100;
    } else if (numAcross > 0 && numAcross <= 100) {
        numAcross = numAcross;
    } else { /* If someone leaves the prompt blank or enters a string, it makes the default grid */
        numAcross = 64;
    }
    numSquares = numAcross ** 2;
    gridContainer.style.setProperty('--columns', numAcross);
    makeGrid();
}