/**
 * Test making a grid, and drawing an arrow
 * between different places on the grid.
 * Additionally, try to get a side view
 * demonstrating which boxes have been selected.
 */

console.log('Hello, World!');

function attack(start) {
    
}

function main() {

    const genSquare_td = document.getElementById("gen");
    const lucSquare_td = document.getElementById("luc");
    const salSquare_td = document.getElementById("sal");

    const milSquare_td = document.getElementById("mil");
    const floSquare_td = document.getElementById("flo");
    const romSquare_td = document.getElementById("rom");

    const aviSquare_td = document.getElementById("avi");
    const marSquare_td = document.getElementById("mar");
    const golSquare_td = document.getElementById("gol");

    genSquare_td.addEventListener('click', () => attack("gen"));
    lucSquare_td.addEventListener('click', () => attack("luc"));
    salSquare_td.addEventListener('click', () => attack("sal"));

    milSquare_td.addEventListener('click', () => attack("mil"));
    floSquare_td.addEventListener('click', () => attack("flo"));
    romSquare_td.addEventListener('click', () => attack("rom"));

    aviSquare_td.addEventListener('click', () => attack("avi"));
    marSquare_td.addEventListener('click', () => attack("mar"));
    golSquare_td.addEventListener('click', () => attack("gol"));
}