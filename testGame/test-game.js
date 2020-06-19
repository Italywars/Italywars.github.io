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


// If attack.length = 0
// Make attacker blue
// If attacker length = 1
// attackee push nation
// draw arrow from attacker to attackee
// push attacker and attackee

const attacker = [];
const attackee = [];

function makeBlue(nation) {
    return function () {
        if (attacker.length === 1) {
            attackee.push(nation);
            $(attacker[0]).toggleClass('game-board');
            // Draw arrow from attacker to attackee
            console.log('draw arrow from ' + attacker[0] + ' to ' + nation);
            attacker.pop();
        } else {
            $(nation).toggleClass('game-board');
            console.log('Alexander has blue balls');
            attacker.push(nation);
        }
        // console.log(JSON.stringify(attacker));
    };
}

$(document).ready(function() {
    for (let i = 0; i < nations.length; i++) {
        const idName = '#' + nations[i];
        $(idName).on('click', makeBlue(idName));
    }
});


function main() {

}

main();