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


// If attack.length = 0
// Make attacker blue
// If attacker length = 1
// attackee push nation
// draw arrow from attacker to attackee
// push attacker and attackee


// Add ability to view visited nations so that visited nations are
// removed from orders list (i.e. reset orders)

// Add ability to remove orders manually from the orders list (and that
// will affect stuff on the map)

// ADD A BOOLEAN BUTTON THAT IF SOMEONE PRESSES CONVOY/SUPPORT, IT SWITCHES
// THE BOOLEAN TO TRUE AND THEN DRAWS A DOTTED LINE (FOR NOW CAN USE
// COLORS TO DESIGNATE CONVOY ORDER) (ALSO WILL NEED TO CHANGE WRITE
// ORDER TO REFLECT THIS)


/** 
 * Given two nations, writes the desired move to
 * the orders table.
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


/** 
 * Given a nation, performs the desired
 * moves based on contextual information.
 */
function makeMove(nation, attacker) {
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


/** 
 * Given an order row id, removes that row.
 * THIS FUNCTION NEEDS WORK
*/
function removeOrder(orderRow) {
    return function () {
        document.getElementById(orderRow).remove();
    }
}


/** Generate a random color, returned as an rgb string. */
function getRandomColor() {
 const r = Math.floor(Math.random() * 256);
 const g = Math.floor(Math.random() * 256);
 const b = Math.floor(Math.random() * 256);
 return `rgb(${r},${g},${b})`;
}


/** 
 * Given the empty colorsHash object,
 * populates the object with key, value
 * pairs. Keys are randomly generated
 * colors as rgb strings. Values are
 * nation objects which contain
 * information about the name and 
 * location and color of that nation.
 */
function populateColorsHash(colorsHash, nationlist) {
  let counter = 0;
  nationlist.forEach(nation => {
    while(true) {
      const colorKey = getRandomColor();
      if (!Object.keys(colorsHash).includes(colorKey)) {
        colorsHash[colorKey] = {
          id: nation, 
          x: 80 * (counter + 1), 
          y: 60, 
          radius: 30, 
          color: 'rgb(255,255,255)',
        };
        counter++;
        return;
      }
    }
  });
  // console.log(JSON.stringify(colorsHash));
}


/** 
 * Given the proper layer, a nation object,
 * and the appropriate color to use, draws the
 * desired nation.
 */
function designNation(layer, nation, colorChoice) {
  layer.beginPath();
  layer.arc(nation.x, nation.y, nation.radius, 0, 2 * Math.PI, false);
  layer.fillStyle = colorChoice;
  layer.fill();
  console.log('drawing ' + nation + ' on ' + layer)
}


/** 
 * On a click, will alert the screen
 * with whichever nation was clicked.
 */
function prepareMove(attacker, canvas, hitCtx, colorsHash) {
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
    const colorKey = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
    // console.log(color);
    // console.log(JSON.stringify(colorsHash));
    // console.log(JSON.stringify(colorsHash));
    console.log(JSON.stringify(pixel));
    // console.log('nation: ' + JSON.stringify(colorsHash[color]) + ', color, ' + color + ', pixel, ' + pixel + ', colorsHash, ' + JSON.stringify(colorsHash));
    // If there is a match, log alert
    if (Object.keys(colorsHash).includes(colorKey)) {
      console.log('mrpoopybuthole');
      const nation = colorsHash[colorKey];
      makeMove(nation.id, attacker);
      console.log('click on nation: ' + nation.id);
      // alert('click on nation: ' + nation.id);
      writeOrder(nation.id, nation.id);
    }
  }
}


/** 
 * This is the main function. Every other function
 * should stem from this branch.
 */
function main() {

  const nationlist = ['gen', 'luc', 'sal', 'mil', 'flo', 'rom', 'avi', 'mar', 'gol'];

  console.log('Hello, World!');

  let attacker = [];
  let visited = [];

  /** 
  * Object used to store nation objects
  * (so an object of objects). Individually
  * (and randomly) generated colors are keys.
  * Nation objects are values.
  */
  let colorsHash = {};
  populateColorsHash(colorsHash, nationlist);
  // console.log(JSON.stringify(colorsHash));

  // Create canvas element for visible map
  const canvas = document.getElementById('map-canvas');
  const ctx = canvas.getContext('2d');

  // Create canvas element for invisible clicking map
  const hitCanvas = document.getElementById('key-canvas');
  const hitCtx = hitCanvas.getContext('2d');

  // Draw the visible and invisible maps
  $(function () {
    for (let [key, value] of Object.entries(colorsHash)) {
      designNation(hitCtx, value, key);
      designNation(ctx, value, value.color);
    }
  });

  // Allow for moves on the map-canvas
  $(canvas).on('click', prepareMove(attacker, canvas, hitCtx, colorsHash));

  // Allow for clicking home
  $('#home').on('click', function () {
    location.href = '../index.html';
  });

  // Allow for moves on the map-table locations
  // (this will be removed)
  for (let i = 0; i < nationlist.length; i++) {
    const nation = nationlist[i];
    $('#' + nation).on('click', makeMove(nation, attacker));
  }

  // ADD THE ABILITY TO REMOVE ORDERS
  for (let i = 0; i < 5; i++) {
    $('orders').on('click', removeOrder(this));
    // console.log(this);
  }
}


main();
