/**
 * This file tests building
 * a sample game, as will
 * be used in the future
 * for games. 
 * 
 */


/** 
 * Given a variable number of nations, writes 
 * the desired move to
 * the orders table.
 */
function writeOrder(...nation) {
  let counter = nation[0];
  let table = document.getElementById('orders');
  let newRow = table.insertRow(-1);
  newRow.setAttribute("id", counter);
  newRow.setAttribute("class", 'orders');
  let newCell = newRow.insertCell(0);
  let newOrder = '';
  if (nation.length === 2) {
    newOrder = document.createTextNode('A ' + nation[1].toUpperCase() + ' H');
  } else if (nation.length === 3) {
    newOrder = document.createTextNode('A ' + nation[1].toUpperCase() + '––' + nation[2].toUpperCase());
  } else if (nation.length === 5) {
    if (nation[4] === 'support') {
      if (nation[2] === nation[3]) {
        newOrder = document.createTextNode('A ' + nation[1].toUpperCase() + ' S A ' + nation[2].toUpperCase());
      } else {
        newOrder = document.createTextNode('A ' + nation[1].toUpperCase() + ' S A ' + nation[2].toUpperCase() + '––' + nation[3].toUpperCase());
      }
    } else if (nation[4] === 'convoy') {
      newOrder = document.createTextNode('F ' + nation[1].toUpperCase() + ' C A ' + nation[2].toUpperCase() + '––' + nation[3].toUpperCase());
    }
  }
  newCell.appendChild(newOrder);

  console.log(JSON.stringify(document.getElementsByClassName('orders')));
}

/**
 * Given attacker and target, performs an attack.
 */
function attackOrder(attacker, target, counter) {
  console.log('ATTACK')
  $('#' + attacker).removeClass('blue-highlight');
  // Draw arrow from attacker to attackee
  writeOrder(counter, attacker, target);
}


/**
 * Given a supporting nation and the supportee, performs
 * a support move. If target is specified, support can
 * be given for an attack or possibly a convoy.
 */
function supportOrder(supporter, supportee, target, counter) {
  console.log('SUPPORT');
  $('#support').removeClass('blue-highlight');
  $('#' + supporter).removeClass('blue-highlight');
  $('#' + supportee).removeClass('green-highlight');
  writeOrder(counter, supporter, supportee, target, 'support');
}


/**
 * Given a fleet, a passenger, and a target, performs
 * a convoy of the passenger to the target.
 */
function convoyOrder(fleet, passenger, target, counter) {
  console.log('CONVOY');
  $('#support').removeClass('blue-highlight');
  $('#' + fleet).removeClass('blue-highlight');
  $('#' + passenger).removeClass('green-highlight');
  writeOrder(counter, fleet, passenger, target, 'convoy');
}

/**
 * Given attacker and a nation, performs a
 * hold order and removes the nation from
 * attacker.
 */
function holdOrder(nation, counter) {
  console.log('HOLD');
  let button = '#' + nation;
  $(button).removeClass('blue-highlight');
  $(button).addClass('bold-text');
  writeOrder(counter, nation);
}

/** 
 * Given a nation, performs the desired
 * moves based on contextual information.
 */
function makeMove(nation, attacker, support, convoy, modifier, visited, counter) {
  return function () {
    if (support.classList.contains('blue-highlight') && convoy.classList.contains('blue-highlight')) {
      alert('Support and convoy may not be selected simultaneously. Please deselect both and try again.');
    }
    if (modifier.length === 0) {
      if (support.classList.contains('blue-highlight') || convoy.classList.contains('blue-highlight')) {
        $('#' + nation).addClass('green-highlight');
        modifier.push(nation);
        return;
      }
    }
    if (attacker.length === 1) {
      let initializer = attacker.pop();
      if (initializer === nation) {
        // HOLD ORDER
        holdOrder(nation, counter);
      } else if (support.classList.contains('blue-highlight')) {
        // SUPPORT ORDER
        supportOrder(initializer, modifier.pop(), nation, counter);
      } else if (convoy.classList.contains('blue-highlight')) {
        // CONVOY ORDER
        convoyOrder(initializer, modifier.pop(), nation, counter);
      } else {
        // ATTACK ORDER
        attackOrder(initializer, nation, counter);
      }
      visited.push(initializer);
    } else {
      if (visited.includes(nation)) {
        alert('You have already used ' + nation.toUpperCase() + ' in a move. Please remove that order before continuing.');
        return;
      }
      $('#' + nation).addClass('blue-highlight');
      attacker.push(nation);
    }
  };
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

function drawVisible(layer, nation) {
  layer.font = 'small-caps 20px Times New Roman';
  layer.fillStyle = 'black';
  layer.strokeStyle = 'black';
  layer.strokeRect(nation.x, nation.y, nation.edge, nation.edge);
  layer.fillText(nation.id, nation.x + 26, nation.y + 42, );
  // layer.arc(nation.x, nation.y, nation.radius, 0, 2 * Math.PI, false);
  // layer.fill();
}

/** 
 * Given the proper layer, a nation object,
 * and the appropriate color to use, draws the
 * desired nation.
 */
function designNation(layer, nation, colorChoice) {
  layer.beginPath();
  layer.fillStyle = colorChoice;
  layer.fillRect(nation.x, nation.y, nation.edge, nation.edge);
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
    console.log(mousePos);
    // Get pixel color and compare it to the list
    const pixel = hitCtx.getImageData(mousePos.x, mousePos.y, 1, 1).data;
    const colorKey = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
    // If there is a match, log alert
    if (Object.keys(colorsHash).includes(colorKey)) {
      const nation = colorsHash[colorKey];
      console.log('click on nation: ' + nation.id);
      // alert('click on nation: ' + nation.id);
      // makeMove(nation.id, attacker);
      // writeOrder(nation.id, nation.id);
      // console.log(colorsHash[colorKey]);
      designNation(ctx, nation, nation.selectColor);
    }
  }
}


/** 
 * Given a boolean button, switches
 * that button to the opposite position.
 */
function changeModifier(button) {
  return function() {
    $(button).addClass('blue-highlight');
  };
}

// ------------------------------------------------------------------------------------

/** 
 * This is the main function. Every other function
 * should stem from this branch.
 */
function main() {

  const nationlist = ['gen', 'luc', 'sal', 'mil', 'flo', 'rom', 'avi', 'mar', 'gol'];

  console.log('Hello, World!');

  /** Array that contains a move initializer */
  let attacker = [];
  /** Array that contains previously used nations */
  let visited = [];
  /** Array that contains a move modifier */
  let modifier = [];

  let rowCounter = 0;

  let support = document.getElementById('support');
  let convoy = document.getElementById('convoy');

  $(function () {
    $(support).on('click', changeModifier(support));
    $(convoy).on('click', changeModifier(convoy));
  });

  
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
      drawVisible(ctx, value)
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
    $('#' + nation).on('click', makeMove(nation, attacker, support, convoy, modifier, visited, rowCounter));
  }

  // ADD THE ABILITY TO REMOVE ORDERS

  let ordersTable = document.getElementsByClassName('orders');
  let keys = Object.keys(ordersTable);
  for (let i = 0; i < keys.length; i++) {
    $('#' + keys[i]).on('click', function() {
      console.log('REMOVE');
      $(keys[i]).remove();
    })
  }

    // $('.orders').on('click', function () {
    //   console.log('REMOVE');
    //   let current = $(this).attr('id');
    //   console.log(current);
    //   $(current).remove();
    // });
  }


main();
