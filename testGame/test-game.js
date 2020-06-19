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

const orders =['1', '2', '3', '4', '5'];

console.log('Hello, World!');


// If attack.length = 0
// Make attacker blue
// If attacker length = 1
// attackee push nation
// draw arrow from attacker to attackee
// push attacker and attackee

const attacker = [];
const attackee = [];
let counter = 0;

function makeBlue(nation) {
    return function () {
        if (attacker.includes(nation)) {
            // bold attacker if clicking on itself –– hold order
            // need to add unbold if is bold
            // if (attacker[0].prop('font-weight') !== 'bold') {
            //     $(attacker[0]).css({'font-weight': 'bold'});
            // } else {
            //     $(attacker[0]).css({'font-weight': 0});
            // }
        }

        if (attacker.length === 1) {
            counter++;
            attackee.push(nation);
            $(attacker[0]).toggleClass('game-board');
            // Draw arrow from attacker to attackee
            // alert('draw arrow from ' + attacker[0] + ' to ' + nation);
            console.log('This is the ' + counter + ' attack');
            console.log('#' + counter);
            $('#' + counter).html('A ' + attacker[0] + '––' + nation);
            attacker.pop();
        } else {
            $(nation).toggleClass('game-board');
            console.log('Alexander has blue balls');
            attacker.push(nation);
        }
    };
}

// Ready clicks
$(document).ready(function() {
    for (let i = 0; i < nations.length; i++) {
        const idName = '#' + nations[i];
        $(idName).on('click', makeBlue(idName));
    }
});

// Makes the orders table red when mouse over it
// $(document).ready(function () {
//     for (let i = 0; i < orders.length; i++) {
//         const idName = '#' + orders[i];
//         $(idName).on('mouseover', function() {
//             $(idName).css({'background-color': 'red'});
//         });
//     }
// });

// Link home
$(function () {
    $('#home').on('click', function () {
        location.href = '../index.html';
    });
})


// ----------------------------------------------------------


const canvas = document.getElementById('map');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'lightblue';
// ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.beginPath();
ctx.moveTo(75, 50);
ctx.lineTo(100, 75);
ctx.lineTo(100, 25);
ctx.fillStyle = 'black';
ctx.fill();

var e = document.getElementById('map');
   elemLeft = e.offsetLeft;
   elemTop = e.offsetTop;
   context = e.getContext('2d');
   elements = [];

// event listener for click event
e.addEventListener('click', function(event) {
   var xVal = event.pageX - elemLeft;
   yVal = event.pageY - elemTop;
   console.log(xVal, yVal);
   elements.forEach(function(ele) {
      if (yVal > ele.top && yVal < ele.top + ele.height && xVal > ele.left && xVal < ele.left + ele.width) {
         alert('element clicked');
      }
   });
}, false);
elements.push({
   color:'purple',
   width: 250,
   height: 200,
   top: 30,
   left: 20
});
elements.forEach(function(ele) {
   context.fillStyle = ele.color;
   context.fillRect(ele.left, ele.top, ele.width, ele.height);
});
