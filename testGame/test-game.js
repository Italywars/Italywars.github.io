/**
 * Test making a grid, and drawing an arrow
 * between different places on the grid.
 * Additionally, try to get a side view
 * demonstrating which boxes have been selected.
 * 
 * 
 * 
 * Select a square (it highlights)
 * 
 * Select a second square (that must be
 * adjacent to the first square), it highlights 
 * momentarily, and then an arrow is drawn between
 * them.
 */

const nations = ['gen', 'luc', 'sal', 'mil', 'flo', 'rom', 'avi', 'mar', 'gol'];

console.log('Hello, World!');

function removeGlow(start) {
    document.getElementById(start).classList.remove('blue-highlight');
}

function attack(start) {
    // Highlight selected square.
    document.getElementById(start).classList.add('blue-highlight');
    const random = document.getElementById(start);
    random.addEventListener('click', () => removeGlow(start));
}

function main() {
    for (let i = 0; i < nations.length; i++) {
        const current = document.getElementById(nations[i]);
        current.addEventListener('click', () => attack(nations[i]));
    }
}

main();