var Sudoku = function() {
  this.setupBoard();
}

Sudoku.prototype.setupBoard = function() {
  function createBlocks() {
    for (var i = 0; i < 9; i++) {
      var div = document.createElement('div');
      div.setAttribute('id', `cluster${i}`);
      $('#sudoku').append(div);
    }
  }


  createBlocks();

  function getCorrectParentId(i, j) {
    var arr = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
    var num = i * 9 + j;
    var line = arr[Math.floor(num / 27)]
    num = num % 9;
    return line[Math.floor(num / 3)];
  }

  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      var span = document.createElement('span');
      span.classList.add('v' + i);
      span.classList.add('h' + j);
      var id = getCorrectParentId(i, j);
      span.innerHTML = `<p>-</p>`;
      $(`#cluster${id}`).append(span);
    }
  }
};

Sudoku.prototype.renderNewBoard = function(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board.length; j++) {
      $(`span.v${i}.h${j} p`).html(board[i][j]);
    }
  }
};


Sudoku.prototype.checkCluster = function(n) {
  var arr = document.querySelectorAll(`#cluster${n} span p`);
  var holdArr = [];
  for (var i = 0; i < arr.length; i++) {
    if(holdArr.includes(arr[i].innerHTML)) {
      return false;
    }
    if(arr[i].innerHTML !== '-') {
      holdArr.push(arr[i].innerHTML);
    }
  }
  return true;
}

Sudoku.prototype.checkRow = function(n) {
  var arr = document.querySelectorAll(`.h${n} p`);
  var holdArr = [];
  for (var i = 0; i < arr.length; i++) {
    if(holdArr.includes(arr[i].innerHTML)) {
      return false;
    }
    if(arr[i].innerHTML !== '-') {
      holdArr.push(arr[i].innerHTML);
    }
  }
  return true;
}

Sudoku.prototype.checkCol = function(n) {
  var arr = document.querySelectorAll(`.v${n} p`);
  var holdArr = [];
  for (var i = 0; i < arr.length; i++) {
    if(holdArr.includes(arr[i].innerHTML)) {
      return false;
    }
    if(arr[i].innerHTML !== '-') {
      holdArr.push(arr[i].innerHTML);
    }
  }
  return true;
}

var board = [[8, '-', '-', '-', '-', '-', '-', '-', '-'],
['-', '-', 3, 6, '-', '-', '-', '-', '-'],
['-', 7, '-', '-', 9, '-', 2, '-', '-'],
['-', 5, '-', '-', '-', 7, '-', '-', '-'],
['-', '-', '-', '-', 4, 5, 7, '-', '-'],
['-', '-', '-', 1, '-', '-', '-', 3, '-'],
['-', '-', 1, '-', '-', '-', '-', 6, 8],
['-', '-', 8, 5, '-', '-', '-', 1, '-'],
['-', 9, '-', '-', '-', '-', 4, '-', '-']];

var mySudoku = new Sudoku();
mySudoku.renderNewBoard(board);
