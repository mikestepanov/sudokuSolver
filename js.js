var Element = function(id, origin, cluster, horizontal, vertical) {
    this.id =  id;
    this.origin = origin;
    this.cluster = cluster;
    this.horizontal = horizontal;
    this.vertical = vertical;
    this.potentials = [];
    this.potentialValue;
    this.potentialId = 0;
    // this.bg = bg;
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
    this.potentialValue =  arr[pos];
    return arr[pos];
  }
};


var Sudoku = function(board) {
  this.setupClusters();
  this.board = this.setupInBoard(board);
  this.setupDomBoard(board);

  this.getPotential();

}

Sudoku.prototype.setupClusters = function() {
  for (var i = 0; i < 9; i++) {
    var div = document.createElement('div');
    div.setAttribute('id', `cluster${i}`);
    $('#sudoku').append(div);
  }
};

Sudoku.prototype.setupInBoard = function(board) {
  var newBoard = [];
  for (var i = 0; i < board.length; i++) {
    var row = []
    for (var j = 0; j < board.length; j++) {
      var id = getId(i, j);
      var origin = board[i][j];
      var cluster = getCorrectParentId(i, j);
      var horizontal = j;
      var vertical = i;
      var el = new Element(id, origin, cluster, horizontal, vertical);
      row.push(el);
    }
    newBoard.push(row);
  }
  return newBoard;
}

Sudoku.prototype.setupDomBoard = function(board) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      var span = document.createElement('span');
      span.classList.add('v' + i);
      span.classList.add('h' + j);
      var id = getCorrectParentId(i, j);
      var value = board[i][j];
      span.innerHTML = `<p>${value}</p>`;
      $(`#cluster${id}`).append(span);
    }
  }
};


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
    if(idx !== -1) {
      el.potentials.splice(idx, 1);
    }
  }
};

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

var humanableBoard = [[1,'-','-',4,8,9,'-','-',6],
[7,3,'-','-','-','-','-',4,'-'],
['-','-','-','-','-',1,2,9,5],
['-','-',7,1,2,'-',6,'-','-'],
[5,'-','-',7,'-',3,'-','-',8],
['-','-',6,'-',9,5,7,'-','-'],
[9,1,4,6,'-','-','-','-','-'],
['-',2,'-','-','-','-','-',3,7],
[8,'-','-',5,1,2,'-','-',4],];

var mySudoku = new Sudoku(hardBoard);

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

function getId(i, j) {
  return 9 * i + j;
}

function getCorrectParentId(i, j) {
  var arr = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
  var num = getId(i, j);
  var line = arr[Math.floor(num / 27)]
  num = num % 9;
  return line[Math.floor(num / 3)];
}

$('#ascendAll').on('click', function() {
  mySudoku.ascendAll();
});
