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
// Why exactly do we need attackee?
const attackee = [];
let counter = 0;

function writeOrder(nation1, nation2, counter) {
  // add calls to toupper
  if (nation1 === nation2) {
    $('#' + counter).html('A ' + nation1 + ' H');
  } 
  else {
    $('#' + counter).html('A ' + nation1 + '––' + nation);
  }
}


function holdOrder(nation) {
  $(nation).toggleClass('green-highlight');
}

function makeMove(nation) {
    return function () {
        counter++;
        if (attacker.includes(nation)) {
            holdOrder(nation);
        }

        if (attacker.length === 1) {
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
$(function() {
    // Linking home
    $('#home').on('click', function () {
        location.href = '../index.html';
    });

    // Clicking on map locations
    for (let i = 0; i < nations.length; i++) {
        const idName = '#' + nations[i];
        $(idName).on('click', makeMove(idName));
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


// ----------------------------------------------------------

/*
const canvas = document.getElementById('map');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'lightblue';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.beginPath();
ctx.moveTo(75, 50);
ctx.lineTo(100, 75);
ctx.lineTo(100, 25);
ctx.fillStyle = 'black';
ctx.fill();
*/

/*
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
*/

// Create canvas element for visible map
const canvas = document.getElementById('map-canvas');
const ctx = canvas.getContext('2d');

// Create canvas element for invisible clicking map
const hitCanvas = document.getElementById('map-canvas');
const hitCtx = hitCanvas.getContext('2d');

// What is this for?
const colorsHash = {};

// Generate a random color
function getRandomColor() {
 const r = Math.round(Math.random() * 255); // Simon here! you could also do math.random() * 256
 const g = Math.round(Math.random() * 255); // and then use the math.floor() function which rounds
 const b = Math.round(Math.random() * 255); // down
 return `rgb(${r},${g},${b})`;
}

// Creates two circles
const circles = [{
  id: '1', x: 40, y: 40, radius: 10, color: 'rgb(255,0,0)'
}, {
  id: '2', x: 100, y: 70, radius: 10, color: 'rgb(0,255,0)'
}];


circles.forEach(circle => {
	while(true) {
     const colorKey = getRandomColor();
     if (!colorsHash[colorKey]) {
        circle.colorKey = colorKey;
        colorsHash[colorKey] = circle;
        return;
     }
  }
});

circles.forEach(circle => {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = circle.color;
  ctx.fill();
  
  hitCtx.beginPath();
  hitCtx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
  hitCtx.fillStyle = circle.colorKey;
  hitCtx.fill();
});

// Test if nations have same color
function hasSameColor(color, nation) {
  return nation.color === color;
}


canvas.addEventListener('click', (e) => {
  const mousePos = {
    x: e.clientX - canvas.offsetLeft,
    y: e.clientY - canvas.offsetTop
  };
  const pixel = hitCtx.getImageData(mousePos.x, mousePos.y, 1, 1).data;
  const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
  const shape = colorsHash[color];
  if (shape) {
     alert('click on circle: ' + shape.id);
  }
 });