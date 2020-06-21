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

const nationlist = ['gen', 'luc', 'sal', 'mil', 'flo', 'rom', 'avi', 'mar', 'gol'];

console.log('Hello, World!');


// If attack.length = 0
// Make attacker blue
// If attacker length = 1
// attackee push nation
// draw arrow from attacker to attackee
// push attacker and attackee

let attacker = [];
let visited = [];
// Add ability to view visited nations so that visited nations are
// removed from orders list (i.e. reset orders)

// Add ability to remove orders manually from the orders list (and that
// will affect stuff on the map)

// ADD A BOOLEAN BUTTON THAT IF SOMEONE PRESSES CONVOY/SUPPORT, IT SWITCHES
// THE BOOLEAN TO TRUE AND THEN DRAWS A DOTTED LINE (FOR NOW CAN USE
// COLORS TO DESIGNATE CONVOY ORDER) (ALSO WILL NEED TO CHANGE WRITE
// ORDER TO REFLECT THIS)


/** Given two nations, writes the desired move to
 * the orders table 
 */
function writeOrder(nation1, nation2) {
  let table = document.getElementById('orders');
  let newRow = table.insertRow(-1);
  let newCell = newRow.insertCell(0);
  let newOrder = '';
  if (nation1 === nation2) {
    newOrder = document.createTextNode('A ' + nation1.toUpperCase() + ' H');
  } else {
    newOrder = document.createTextNode('A ' + nation1.toUpperCase() + '––' + nation2.toUpperCase());
  }
  newCell.appendChild(newOrder);
}


/** Given a nation, performs whatever move is desired
 * of that nation g, removes that row 
 */
function makeMove(nation) {
    return function () {
        if (attacker.includes(nation)) {
            $('#' + nation).removeClass('blue-highlight');
            $('#' + nation).addClass('green-highlight');
            writeOrder(nation, nation);
            attacker.pop();
        }
        else if (attacker.length === 1) {
            $('#' + attacker[0]).removeClass('blue-highlight');
            // Draw arrow from attacker to attackee
            writeOrder(attacker.pop(), nation);
        } else {
            $('#' + nation).addClass('blue-highlight');
            attacker.push(nation);
        }
    };
}


/** Given an order row id, removes that row */
function removeOrder(orderRow) {
    return function () {
        document.getElementById(orderRow).remove();
    }
}


/** THIS IS THE MAIN FUNCTION */
$(function() {
    // Linking home
    $('#home').on('click', function () {
        location.href = '../index.html';
    });

    // Clicking on map locations
    for (let i = 0; i < nationlist.length; i++) {
        const nation = nationlist[i];
        $('#' + nation).on('click', makeMove(nation));
    }

    // ADD THE ABILITY TO REMOVE ORDERS
    for (let i = 0; i < 5; i++) {
        $('orders').on('click', removeOrder(this));
        // console.log(this);
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


// Create canvas element for visible map
const canvas = document.getElementById('map-canvas');
const ctx = canvas.getContext('2d');

// Create canvas element for invisible clicking map
const hitCanvas = document.getElementById('map-canvas');
const hitCtx = hitCanvas.getContext('2d');

// To store color data
const colorsHash = {};

// Generate a random color
function getRandomColor() {
 const r = Math.floor(Math.random() * 256); // Simon here! you could also do math.random() * 256
 const g = Math.floor(Math.random() * 256); // and then use the math.floor() function which rounds
 const b = Math.floor(Math.random() * 256); // down
 return `rgb(${r},${g},${b})`;
}

// Populate nations on map from the master list
const nations = [];
for (let i = 0; i < nationlist.length; i++) {
  nations.push({
    // Names and centers each circle and initializes the visible color value
    id: nationlist[i], x: 80*(i+1), y: 60, radius: 30, color: 'rgb(255,0,0)'
  })
}

// Assign the nations a random color
nations.forEach(circle => {
	while(true) {
     const colorKey = getRandomColor();
     if (!colorsHash[colorKey]) {
        circle.colorKey = colorKey;
        colorsHash[colorKey] = circle;
        return;
     }
  }
});

// Rect country design function
function designNation(ctx, circle) {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = circle.color;
  ctx.fill();
}

// Draw the countries
nations.forEach(circle => {
  // Draw visible map
  /*
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = circle.color;
  ctx.fill();
  */
  
  // Draw invisible map
  hitCtx.beginPath();
  hitCtx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
  hitCtx.fillStyle = circle.colorKey;
  hitCtx.fill();
});

// Test if nations on invisble map have same color
function hasSameColor(color, nation) {
  return nation.color === color;
}

function prepareMove() {
  return function (e) {
    console.log('hi');
    // Document the click location and adjust for canvas size
    const mousePos = {
      x: e.clientX - canvas.offsetLeft,
      y: e.clientY - canvas.offsetTop
    };
    console.log(mousePos);
    // Get pixel color and compare it to the list
    const pixel = hitCtx.getImageData(mousePos.x, mousePos.y, 1, 1).data;
    const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
    const shape = colorsHash[color];
    console.log('shape: ' + shape + ', color, ' + color + ', pixel, ' + pixel);
    // If there is a match, log alert
    if (shape) {
      alert('click on nation: ' + shape.id);
      writeOrder(shape.id, shape.id);
    }
  }
};

canvas.addEventListener('click', prepareMove());




/*
$(function() {
  for (let i = 0; i < nationlist.length; i++) {
    const nation = nationlist[i];
    $('#' + nation).on('click', prepareMove());
  }
});
*/

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