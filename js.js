var Element = function(id, origin, cluster, horizontal, vertical) {
    this.id =  id;
    this.origin = origin;
    this.cluster = cluster;
    this.horizontal = horizontal;
    this.vertical = vertical;
    this.potentials = [];
    this.value = origin;
    this.potentialId = 0;
  };

Element.prototype.rotate = function() {
  var pos = this.potentialId;
  pos++;
  var arr = this.potentials;
  if (!arr[pos]) {
    return null;
    this.potentialId = 0;
  } else {
    this.potentialId = pos;
    this.value =  arr[pos];
    return arr[pos];
  }
};


var Sudoku = function(board) {

  this.board = this.setupInBoard(board);
  this.setupDomBoard(board);

  this.getPotential();
  this.headPotential = [0, 0];
}


Sudoku.prototype.getPotential = function() {
  var changed;
  var board = this.board;
  for (var i = 0; i < board.length; i++) {
    for(var j = 0; j < board.length; j++) {
      var el = board[i][j];
      if (el.origin === '-') {
        var potentials = [1,2,3,4,5,6,7,8,9];
        var potentials = this.getPotentialCluster(potentials, el);
        var potentials = this.getPotentialRow(potentials, el, i);
        var potentials = this.getPotentialCol(potentials, el, j);
        el.potentials = potentials;
      }
    }
  }
  return changed;
};

Sudoku.prototype.getPotentialCluster = function(potential, el) {
  var board = this.board;
  var cluster = this.getCluster(el);
  for (var i = 0; i < cluster.length; i++) {
    var val = cluster[i].origin;
    var idx = potential.indexOf(val);
    if (idx !== -1) {
      potential.splice(idx, 1);
    }
  }
  return potential;
};

Sudoku.prototype.getPotentialCol = function(potential, el, h) {
  var col = this.getCol(h);
  for (var i = 0; i < col.length; i++) {
    var val = col[i].origin;
    var idx = potential.indexOf(val);
    if (idx !== -1)
      potential.splice(idx, 1);
    }
  return potential;
};

Sudoku.prototype.getPotentialRow = function(potential, el, v) {
  var row = this.getRow(v);
  for (var i = 0; i < row.length; i++) {
    var val = row[i].origin;
    var idx = potential.indexOf(val);
    if (idx !== -1)
      potential.splice(idx, 1);
    }
  return potential;
};


Sudoku.prototype.ascendAll = function() {
  console.log(55);
  var board = this.board;
  var canAscend = [];
  var ascended;
  for (var i = 0; i < board.length; i++) {
    for(var j = 0; j < board.length; j++) {
      var el = board[i][j];
      if (el.potentials.length === 1) {
        ascended = true
        canAscend.push(el);
      }
    }
  }
  for (var i = 0; i < canAscend.length; i++) {
    this.ascend(canAscend[i]);
    console.log(i);
  }
  if (ascended) {
    this.ascendAll();
  }
};

Sudoku.prototype.ascend = function(obj) {
  obj.origin = obj.potentials[0];
  $(`span.v${obj.vertical}.h${obj.horizontal} p`).html(obj.origin);
  this.clearAscendance(obj);
};

Sudoku.prototype.clearAscendance = function(obj) {
  var board = this.board;
  var row = this.getRow(obj.vertical);
  var col = this.getCol(obj.horizontal);
  var cluster = this.getCluster(obj);
  var arr = cluster.concat(row, col);
  for (var i = 0; i < arr.length; i++) {
    var el = arr[i];
    var idx = el.potentials.indexOf(obj.origin);
    if (idx !== -1) {
      el.potentials.splice(idx, 1);
    }
  }
};

// Sudoku.prototype.bruteForce = function() {
//   var board = this.board;
//   for (var i = 0; i < board.length; i++) {
//     for (var j = 0; j < board.length; j++) {
//       var el = board[i][j];
//       if (el.origin === '-') {
//         if(this.value === '-') {
//           this.value = this.potentials[0];
//         }
//         var ans = bruteCell(i, j);
//       }
//     }
//   }
// };
//
// Sudoku.prototype.bruteCell = function(i, j) {
//   var cell = this.board[i][j];
//   if (allClear(i, j)) {
//
//   }
// };

Sudoku.prototype.getParty = function(obj) {
  var arrWithDups = [];
  var row = getRow(obj.vertical);
  var col = getCol(obj.horizontal);
  var cluster = getCluster(obj);
}

Sudoku.prototype.getRow = function(v) {
  return this.board[v];
};

Sudoku.prototype.getCol = function(h) {
  var board = this.board;
  var col = [];
  for (var v = 0; v < board.length; v++) {
    col.push(board[v][h]);
  }
  return col;
};

Sudoku.prototype.getCluster = function(obj) {
  var pos = headClusterPos(obj);
  var board = this.board;
  var cluster = [];
  for (var v = 0; v < 3; v++) {
    for (var h = 0; h < 3; h++) {
      cluster.push(board[pos[0] + v][pos[1] + h]);
    }
  }
  return cluster;
};

var hardBoard = [[8,'-','-','-','-','-','-','-','-'],
['-','-',3,6,'-','-','-','-','-'],
['-',7,'-','-',9,'-',2,'-','-'],
['-',5,'-','-','-',7,'-','-','-'],
['-','-','-','-',4,5,7,'-','-'],
['-','-','-',1,'-','-','-',3,'-'],
['-','-',1,'-','-','-','-',6,8],
['-','-',8,5,'-','-','-',1,'-'],
['-',9,'-','-','-','-',4,'-','-']];


$('span').on('click', function(event) {
  var el = event.target;
  if (el.tagName === 'P') {
    el = el.parentElement;
  }
  var x = Number(el.classList[0].slice(1));
  var y = Number(el.classList[1].slice(1));
  console.log(mySudoku.board[x][y].potentials);
});

function headClusterPos(obj) {
  var v = Math.floor(obj.vertical / 3) * 3;
  var h = Math.floor(obj.horizontal / 3) * 3;
  return [v, h];
}


$('#ascendAll').on('click', function() {
  mySudoku.ascendAll();
});

// $('#bruteForce').on('click', function() {
//   mySudoku.bruteForce();
// });
