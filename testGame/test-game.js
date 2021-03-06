/**
 * This file tests building
 * a sample game, as will
 * be used in the future
 * for games.
 * 
 * @editors Simon Camacho, Alexander DelFranco, Eva Batelaan
 */


// ––––––––– FROM THE INTERNET –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––


/** 
 * Given a start and end-point, draws an arrow
 * TAKEN FROM STACK OVERFLOW
 * EDITED SLIGHTLY BY @editor Simon Camacho
 * https://stackoverflow.com/questions/808826/draw-arrow-on-canvas-tag
 */
function drawArrow(startX, startY, endX, endY, layer){
  // variables to be used when creating the arrow
  let headlen = 10;

  let angle = Math.atan2(endY - startY, endX - startX);

  //starting path of the arrow from the start square to the end square and drawing the stroke
  layer.beginPath();
  layer.moveTo(startX, startY);
  layer.lineTo(endX, endY);
  layer.strokeStyle = 'black';
  layer.lineWidth = 3;
  layer.stroke();

  // incorporate next lines
  // let linePathX = endX - (headlen * Math.cos(angle-Math.PI / 7));
  // let linePathY = endY - (headlen * Math.sin(angle-Math.PI / 7));

  //starting a new path from the head of the arrow to one of the sides of the point
  layer.beginPath();
  layer.moveTo(endX, endY);
  layer.lineTo(endX - headlen * Math.cos(angle-Math.PI/7), endY - headlen * Math.sin(angle-Math.PI/7));

  //path from the side point of the arrow, to the other side point
  layer.lineTo(endX-headlen*Math.cos(angle+Math.PI/7),endY-headlen*Math.sin(angle+Math.PI/7));

  //path from the side point back to the tip of the arrow, and then again to the opposite side point
  layer.lineTo(endX, endY);
  layer.lineTo(endX-headlen*Math.cos(angle-Math.PI/7),endY-headlen*Math.sin(angle-Math.PI/7));

  //draws the paths created above
  layer.strokeStyle = 'black';
  layer.lineWidth = 4;
  layer.stroke();
  layer.fillStyle = 'black';
  layer.fill();
}






// –––––––––– TO DO ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

// ADD A BANNER TO TOP SAYING MOVE JUST SELECTED (BECAUSE CAN'T IMMEIDATELY SEE ORDERS TABLE)
// ADD ORDER REMOVAL
// ADD JSON COMPATIBILITY
// ADD ARROW DRAWING
// ADD REALISTIC MAP
// FIX SWIPING BUG (swipe down, same nation selected)

// Fix draw visible –– seems to be making blocks smaller on redraw

/** 
 * When we have to do moves regarding attacks etc.,
 * can only allow attacks on neighboring states
 * this can be monitored by having a list of all
 * of the neighboring states contained inside 
 * the nations object 
 */

// –––––––––– PROGRAM ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

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
 * Gvien the proper layer, and a nation object,
 * draws the desired nation visibly.
 */
function drawVisible(layer, nation) {
  // On redraw after nation select, doesn't draw original color which needs
  // to be fixed
  layer.font = 'small-caps 20px Times New Roman';
  layer.lineWidth = 1;
  layer.fillStyle = 'black';
  layer.strokeStyle = 'black';
  layer.strokeRect(nation.x, nation.y, nation.edge, nation.edge);
  layer.fillText(nation.id, nation.x + 26, nation.y + 42);
  // layer.arc(nation.x, nation.y, nation.radius, 0, 2 * Math.PI, false);
  // layer.fill();
}


/** 
 * Given a variable number of nations, writes 
 * the desired move to
 * the orders table.
 */
function writeOrder(...nation) {
  let table = document.getElementById('orders');
  let newRow = table.insertRow(-1);
  // the next rows for order removal
  let counter = nation[0];
  newRow.setAttribute("id", counter);
  // newRow.setAttribute("class", 'orders');
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
  // THIS NEEDS WORK –– DEMONSTRATING ORDERS AS NOTIFICATIONS
  // if (Notification.permission === 'granted') {
  //   var orderNotification = new Notification(newOrder);
  // }
  newCell.appendChild(newOrder);

}


/**
 * Given attacker and target, performs an attack.
 */
function attackOrder(attacker, target, counter, layer) {
  console.log('ATTACK')
  // Draw arrow from attacker to attackee
  let centerXAttacker = attacker.x + attacker.edge/2;
  let centerYAttacker = attacker.y + attacker.edge/2
  let centerXTarget = target.x + target.edge/2
  let centerYTarget = target.y + target.edge/2
  // why is a black box being drawn around attacking nations?
  drawVisible(layer, attacker);
  console.log(centerXAttacker);
  console.log(centerXTarget);
  // if (centerXAttacker - centerXTarget > 80 || centerXAttacker - centerXTarget < -80) {
  //   alert('These nations are not adjacent. Please try again.')
  //   // IF THIS HAPPENS, HAVE TO REMOVE ORIGINAL NATION FROM VISITED
  //   return;
  // }
  drawArrow(centerXAttacker, centerYAttacker, centerXTarget, centerYTarget, layer);
  writeOrder(counter, attacker.id, target.id);
}


/**
 * Given a supporting nation and the supportee, performs
 * a support move. If target is specified, support can
 * be given for an attack or possibly a convoy.
 */
function supportOrder(supporter, supportee, target, counter, layer) {
  console.log('SUPPORT');
  $('#support').removeClass('blue-highlight');
  drawVisible(layer, supporter);
  drawVisible(layer, supportee);
  writeOrder(counter, supporter.id, supportee.id, target.id, 'support');
}


/**
 * Given a fleet, a passenger, and a target, performs
 * a convoy of the passenger to the target.
 */
function convoyOrder(fleet, passenger, target, counter, layer) {
  console.log('CONVOY');
  $('#convoy').removeClass('blue-highlight');
  drawVisible(layer, fleet);
  drawVisible(layer, passenger);
  writeOrder(counter, fleet.id, passenger.id, target.id, 'convoy');
}


/**
 * Given attacker and a nation, performs a
 * hold order and removes the nation from
 * attacker.
 */
function holdOrder(nation, counter, layer) {
  console.log('HOLD');
  drawVisible(layer, nation);
  writeOrder(counter, nation.id);
}


/** 
 * Given a nation, performs the desired
 * moves based on contextual information.
 */
function move(nation, attacker, support, convoy, modifier, visited, counter, layer) {
  if (support.classList.contains('blue-highlight') && convoy.classList.contains('blue-highlight')) {
    alert('Support and convoy may not be selected simultaneously. Please try again.');
    $(support).removeClass('blue-highlight');
    $(convoy).removeClass('blue-highlight');
    return;
  }
  if (modifier.length === 0) {
    if (support.classList.contains('blue-highlight') || convoy.classList.contains('blue-highlight')) {
      // Maybe add some similar functionality with color filling (as next line)
      // $('#' + nation.id).addClass('green-highlight');
      designNation(layer, nation, 'rgb(149, 251, 149)');
      modifier.push(nation);
      return;
    }
  }
  if (attacker.length === 1) {
    let initializer = attacker.pop();
    if (initializer.id === nation.id) {
      // HOLD ORDER
      holdOrder(nation, counter, layer);
    } else if (support.classList.contains('blue-highlight')) {
      // SUPPORT ORDER
      supportOrder(initializer, modifier.pop(), nation, counter, layer);
    } else if (convoy.classList.contains('blue-highlight')) {
      // CONVOY ORDER
      convoyOrder(initializer, modifier.pop(), nation, counter, layer);
    } else {
      // ATTACK ORDER
      attackOrder(initializer, nation, counter, layer);
    }
    visited[initializer.id] = initializer;
  } else {
    // Just commented out for coloring purposes. Needs to be uncommented for final product
    if (Object.keys(visited).includes(nation.id)) {
      alert('You have already used ' + nation.id.toUpperCase() + ' in a move. Please remove that order before continuing.');
      return;
    }
    // designNation(layer, nation, nation.selectColor);
    attacker.push(nation);
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
  let xCounter = 0;
  let yCounter = 0;
  nationlist.forEach(nation => {
    while(true) {
      const colorKey = getRandomColor();
      if (!Object.keys(colorsHash).includes(colorKey)) {
        colorsHash[colorKey] = {
          id: nation, 
          x: 80 * (xCounter + 1), 
          y: 80 * (yCounter + 1), 
          edge: 80, 
          color: 'rgb(173,216,230)',
          selectColor: 'rgb(120,180,230)'
        };
       // if (xCounter === 9) yCounter++;
        xCounter++;
        if (xCounter%8 === 0) {
          xCounter = 0;
          yCounter++;
        }
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
 * On a click, will alert the screen
 * with whichever nation was clicked.
 */
function prepareMove(attacker, canvas, ctx, hitCtx, colorsHash, support, convoy, modifier, visited, counter) {
  return function (e) {
    // Document the click location and adjust for canvas size
    const mousePos = {  
      x: e.clientX - canvas.offsetLeft,
      y: e.clientY - canvas.offsetTop
    };
    // Get pixel color and compare it to the list
    const pixel = hitCtx.getImageData(mousePos.x, mousePos.y, 1, 1).data;
    const colorKey = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
    // If there is a match, make a move
    if (Object.keys(colorsHash).includes(colorKey)) {
      const nation = colorsHash[colorKey];
      console.log('click on nation: ' + nation.id);
      move(nation, attacker, support, convoy, modifier, visited, counter, ctx);
    }
  }
}


/** 
 * Given a support or convoy button, switches
 * that button  position.
 */
function changeModifier(button) {
  return function() {
    $(button).toggleClass('blue-highlight');
  };
}


// ------------------------------------------------------------------------------------


/** 
 * This is the main function. Every other function
 * should stem from this branch.
 */
function main() {

  // maybe change to object?
  const NATIONS = [
    'avi', 'swi', 'tur', 'como', 'tyr', 'carin', 'aus', 'hun',
    'mar', 'pro', 'sav', 'salz', 'mon', 'pav', 'mil', 'trent',
    'gol', 'ls', 'gen', 'for', 'par', 'cre', 'ber', 'ver',
    'mod', 'man', 'fer', 'pad', 'tre', 'fri', 'car', 'sla',
    'pisa', 'luc', 'pis', 'flo', 'bol', 'ven', 'ist', 'cro',
    'cor', 'pio', 'sie', 'are', 'urb', 'anc', 'ua', 'dal',
    'wm', 'sar', 'ts', 'pat', 'per', 'rome', 'spo', 'bos',
    'cap', 'nap', 'sal', 'aqu', 'bari', 'la', 'rag', 'her',
    'tun', 'cm', 'pal', 'mes', 'gon', 'otr', 'dur', '',
    'cm', 'is'
  ]
  // ['gen', 'luc', 'sal', 'mil', 'flo', 'rom', 'avi', 'mar', 'gol', 'swi',  'tur', 'como'];

  console.log('Hello, World!');  

  /** Array that contains a move initializer */
  let attacker = [];
  /** 
   * Object that contains previously used nations.
   * Nation id's are keys and nation objects are
   * values. 
  */
  let visited = {};
  /** Array that contains a move modifier */
  let modifier = [];

  let rowCounter = 0;

  let support = document.getElementById('support');
  let convoy = document.getElementById('convoy');

  $(function () {
    $(support).on('click', changeModifier(support));
    $(convoy).on('click', changeModifier(convoy));
  });

  $("#outer_canvas").mousemove(function(e) {
    var relativePosition = {
      left: e.pageX - $(document).scrollLeft() - $('#canvas').offset().left,
      top : e.pageY - $(document).scrollTop() - $('#canvas').offset().top
    };
    $('#mousepos').html('<p>x: ' + relativePosition.left + ' y: ' + relativePosition.top + ' </p>');
});
  
  /** 
  * Object used to store nation objects
  * (so an object of objects). Individually
  * (and randomly) generated colors are keys.
  * Nation objects are values.
  */
  let colorsHash = {};
  populateColorsHash(colorsHash, NATIONS);
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
  $(canvas).on('click', prepareMove(attacker, canvas, ctx, hitCtx, colorsHash, support, convoy, modifier, visited, rowCounter));

  // Allow for clicking home
  $('#home').on('click', function () {
    location.href = '../index.html';
  });

  $('#notifications').on('click', function () {
    Notification.requestPermission().then(function(result) {
      console.log('permission ' + result);
    });
  });


  // –––––––––– UNDER CONSTRUCTION –––––––––––––––––

  // ADD THE ABILITY TO REMOVE ORDERS
  // let ordersTable = document.getElementsByClassName('orders');
  // let keys = Object.keys(ordersTable);
  // for (let i = 0; i < keys.length; i++) {
  //   $('#' + keys[i]).on('click', function() {
  //     console.log('REMOVE');
  //     $(keys[i]).remove();
  //   })
  // }

    // $('.orders').on('click', function () {
    //   console.log('REMOVE');
    //   let current = $(this).attr('id');
    //   console.log(current);
    //   $(current).remove();
    // });

    // $(function () {
    //   $('.orders-table').on('click', function () {
    //     let current = $(this).closest('tr').attr('id');
    //     console.log(JSON.stringify(current));
    //   });
    // });


  // –––––––––––––––––––––––––––––––––––––––––––––––

  // ADD THE ABILITY TO READ FROM AND WRITE TO A JSON FILE

  // get info from file

  // let database = JSON.parse('test-database.json');

  // fetch('https://github.com/Italywars/Italywars.github.io/blob/master/testGame/test-database.json')
  //   .then(function(resp) {
  //     return resp.json();
  //   })
  //   .then(function(data) {
  //     console.log(data);
  //   });


  // $.ajax({
  //   type: 'GET',
  //   url: 'test-database.json',
  //   success: function(data) {
  //     console.log('success', data);
  //   }
  // });

  // –––––––––––––––––––––––––––––––––––––––––––––––

  }


main();
