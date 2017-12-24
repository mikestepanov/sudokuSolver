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
  this.initialize(board);
};

Sudoku.prototype.initialize = function(board) {
  if (Math.sqrt(board.length) % 1 === 0) {
    this.setupBoard(board);
  } else {
    $('#sudoku').html('<p>Make sure squared root of length of sudoky board is a whole number, lel.</p>');
  }
}

Sudoku.prototype.setupBoard = function(board) {
  this.clusterMap = this.setupClusters(board.length);
  console.log(this.clusterMap);
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
      var id = getId(i, j);
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

Sudoku.prototype.getCorrectParentId = function(i, j) {
  var clusters = this.clusterMap;
  console.log(clusters);
  var num = getId(i, j);
  var line = clusters[Math.floor(num / Math.pow(clusters.length, 3))];
  num = num % 9;
  return line[Math.floor(num / clusters.length)];
};

function getId(i, j) {
  return 9 * i + j;
};


var hardBoard = [[1,'-','-',4,8,9,'-','-',6],
[7,3,'-','-','-','-','-',4,'-'],
['-','-','-','-','-',1,2,9,5],
['-','-',7,1,2,'-',6,'-','-'],
[5,'-','-',7,'-',3,'-','-',8],
['-','-',6,'-',9,5,7,'-','-'],
[9,1,4,6,'-','-','-','-','-'],
['-',2,'-','-','-','-','-',3,7],
[8,'-','-',5,1,2,'-','-',4],];

var mySudoku = new Sudoku(hardBoard);
console.log(mySudoku);
