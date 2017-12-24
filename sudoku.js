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
  this.setupClusters(board.length);
};

Sudoku.prototype.setupClusters = function(numOfClusters) {
  for (var i = 0; i < numOfClusters; i++) {
    var div = $("<div>");
    div.attr('id', `cluster${i}`);
    $('#sudoku').append(div);
  }
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
