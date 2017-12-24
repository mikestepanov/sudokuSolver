var Sudoku = function(board) {
  this.foundPotentials = false;
  this.ascended = false;
  this.initialize(board);
  this.getPotentials();
};

// start INITIALIZE THE BOARD
Sudoku.prototype.initialize = function(board) {
  if (Math.sqrt(board.length) % 1 === 0) {
    this.setupBoard(board);
  } else {
    $('#sudoku').html('<p>Make sure squared root of length of sudoky board is a whole number, lel.</p>');
  }
}

Sudoku.prototype.setupBoard = function(board) {
  this.clusterMap = this.setupClusters(board.length);
  this.board = this.setupInBoard(board, this);
  this.setupDomBoard(board);
};

Sudoku.prototype.setupClusters = function(numOfClusters) {
  var max = Math.sqrt(numOfClusters);
  var clusters = [];
  for (var i = 0; i < max; i++) {
    var arr = [];
    for (var j = 0; j < max; j++) {
      var num = i * max + j;
      var div = $("<div>");
      div.attr('id', `cluster${num}`);
      $('#sudoku').append(div);
      arr.push(num);
    }
    clusters.push(arr);
  }
  return clusters;
};

Sudoku.prototype.setupInBoard = function(board) {
  var newBoard = [];
  for (var i = 0; i < board.length; i++) {
    var row = []
    for (var j = 0; j < board.length; j++) {
      var id = this.getId(i, j, board.length);
      var origin = board[i][j];
      var cluster = this.getCorrectParentId(i, j);
      var horizontal = j;
      var vertical = i;
      var el = new Element(id, origin, cluster, horizontal, vertical);
      row.push(el);
    }
    newBoard.push(row);
  }
  return newBoard;
};

Sudoku.prototype.setupDomBoard = function(board) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      var span = document.createElement('span');
      span.classList.add('v' + i);
      span.classList.add('h' + j);
      var id = this.getCorrectParentId(i, j);
      var value = board[i][j];
      span.innerHTML = `<p>${value}</p>`;
      $(`#cluster${id}`).append(span);
    }
  }
};
// end INITIALIZE THE BOARD

// start GET POTENTIALS
Sudoku.prototype.getPotentials = function() {
  var board = this.board;
  for (var i = 0; i < board.length; i++) {
    for(var j = 0; j < board.length; j++) {
      var el = board[i][j];
      if (el.origin === '-') {
        var potentials = [1,2,3,4,5,6,7,8,9];
        var potentials = this.filterPotentialCluster(potentials, el);
        var potentials = this.filterPotentialRow(potentials, el, i);
        var potentials = this.filterPotentialCol(potentials, el, j);
        el.potentials = potentials;
      }
    }
  }
  this.foundPotentials = true;
};

Sudoku.prototype.filterPotentialCluster = function(potential, el) {
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

Sudoku.prototype.filterPotentialCol = function(potential, el, h) {
  var col = this.getCol(h);
  for (var i = 0; i < col.length; i++) {
    var val = col[i].origin;
    var idx = potential.indexOf(val);
    if (idx !== -1)
      potential.splice(idx, 1);
    }
  return potential;
};

Sudoku.prototype.filterPotentialRow = function(potential, el, v) {
  var row = this.getRow(v);
  for (var i = 0; i < row.length; i++) {
    var val = row[i].origin;
    var idx = potential.indexOf(val);
    if (idx !== -1)
      potential.splice(idx, 1);
    }
  return potential;
};
// end GET POTENTIALS

// start ASCENDING
Sudoku.prototype.ascendAll = function() {
  if (!this.foundPotentials) {
    this.getPotentials();
  }
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
  this.updatePotentials(obj);
};

Sudoku.prototype.updatePotentials = function(obj) {
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
// end ASCENDING

// SUPPORTING FUNCTIONS
Sudoku.prototype.getCorrectParentId = function(i, j) {
  var clusters = this.clusterMap;
  var num = this.getId(i, j, Math.pow(clusters.length, 2));
  var line = clusters[Math.floor(num / Math.pow(clusters.length, 3))];
  num = num % 9;
  return line[Math.floor(num / clusters.length)];
};

Sudoku.prototype.getId = function(i, j, max) {
  return max * i + j;
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
  var board = this.board;
  var max = Math.sqrt(board.length);
  var pos = this.headClusterPos(obj, max);
  var cluster = [];
  for (var v = 0; v < max; v++) {
    for (var h = 0; h < max; h++) {
      cluster.push(board[pos[0] + v][pos[1] + h]);
    }
  }
  return cluster;
};

Sudoku.prototype.headClusterPos = function(obj, max) {
  var v = Math.floor(obj.vertical / max) * max;
  var h = Math.floor(obj.horizontal / max) * max;
  return [v, h];
};
