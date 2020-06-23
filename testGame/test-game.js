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
          edge: 80, 
          color: 'rgb(173,216,230)',
          selectColor: 'rgb(120,180,230)'
        };
        counter++;
        return;
      }
    }
  });
}

// We need two draw functions so the text and borders
// on the visible map. We can write the baseline drawing
// function separately and nest it in a full drawing
// function for the visible map


/** 
 * Given the proper layer, a nation object,
 * and the appropriate color to use, draws the
 * desired nation.
 */
function designNation(layer, nation, colorChoice) {
  layer.beginPath();
  layer.fillStyle = colorChoice;
  layer.strokeStyle = 'black';
  layer.font = 'small-caps 20px Times New Roman';
  // layer.arc(nation.x, nation.y, nation.radius, 0, 2 * Math.PI, false);
  // layer.fill();
  layer.fillRect(nation.x, nation.y, nation.edge, nation.edge);
  layer.strokeRect(nation.x, nation.y, nation.edge, nation.edge);
  layer.fillStyle = 'black';
  layer.fillText(nation.id, nation.x + 26, nation.y + 42, );
}

/** 
 * On a click, will alert the screen
 * with whichever nation was clicked.
 */
function prepareMove(attacker, canvas, ctx, hitCtx, colorsHash) {
  return function (e) {
    // Document the click location and adjust for canvas size
    const mousePos = {
      x: e.clientX - canvas.offsetLeft,
      y: e.clientY - canvas.offsetTop
    };
    // Get pixel color and compare it to the list
    const pixel = hitCtx.getImageData(mousePos.x, mousePos.y, 1, 1).data;
    const colorKey = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
    // If there is a match, log alert
    if (Object.keys(colorsHash).includes(colorKey)) {
      console.log('mrpoopybutthole');
      const nation = colorsHash[colorKey];
      console.log('click on nation: ' + nation.id);
      // alert('click on nation: ' + nation.id);
      makeMove(nation.id, attacker);
      writeOrder(nation.id, nation.id);
      console.log(colorsHash[colorKey]);
      designNation(ctx, nation, nation.selectColor);
    }
  }
}

// ------------------------------------------------------------------------------------

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
  let canvas = document.getElementById('map-canvas');
  let ctx = canvas.getContext('2d');

  // Create canvas element for invisible clicking map
  const hitCanvas = document.createElement('canvas');
  Object.assign(hitCanvas, {
    className: 'key-canvas',
    height: 1200,
    width: 840,
  });
  const hitCtx = hitCanvas.getContext('2d');

  // Draw the visible and invisible maps
  $(function () {
    for (let [key, value] of Object.entries(colorsHash)) {
      designNation(hitCtx, value, key);
      designNation(ctx, value, value.color);
    }
  });

  // Allow for moves on the map-canvas
  $(canvas).on('click', prepareMove(attacker, canvas, ctx, hitCtx, colorsHash));

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
