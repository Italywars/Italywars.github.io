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

//const { JSDOM } = require( "jsdom" );
//const { window } = new JSDOM( "" );
//const $ = require( "jquery" )( window );

const nations = ['gen', 'luc', 'sal', 'mil', 'flo', 'rom', 'avi', 'mar', 'gol'];

console.log('Hello, World!');

$(document).ready(function(){
    $(document.getElementsByClassName("game-board")).hide();
})

/*
function removeGlow(start) {
    document.getElementById(start).classList.remove('blue-highlight');
    console.log("remove glow called")
}

function attack(start) {
    return function () {
        // Highlight selected square
        document.getElementById(start).classList.add('blue-highlight');
        const random = document.getElementById(start);
        random.addEventListener('click', () => removeGlow(start));
        console.log("attack called");
    }
}

function openCall() {
    for (let i = 0; i < nations.length; i++) {
        const current = document.getElementById(nations[i]);
        current.addEventListener('click', attack(nations[i]), false);
        current.removeEventListener('click', attack(nations[i]), false);
    }
}

function closeCall() {
    for (let i = 0; i < nations.length; i++) {
        const current = document.getElementById(nations[i]);
        current.removeEventListener('click', attack(nations[i]));
        console.log("closing call " + i);
    }
}
*/

function main() {
    //openCall()
    //closeCall()
}

main();


//Listen for selecting click on any country
//Highlight country that has been clicked and selected
//End listen for selecting click
//Open listen for attacking click
//Conditional: if country attacks itself, then deselect
//              else deselect country and draw arrow
//Begin listening for selecting click