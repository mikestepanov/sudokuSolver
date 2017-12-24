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

var hardBoard = [[8,'-','-','-','-','-','-','-','-'],
['-','-',3,6,'-','-','-','-','-'],
['-',7,'-','-',9,'-',2,'-','-'],
['-',5,'-','-','-',7,'-','-','-'],
['-','-','-','-',4,5,7,'-','-'],
['-','-','-',1,'-','-','-',3,'-'],
['-','-',1,'-','-','-','-',6,8],
['-','-',8,5,'-','-','-',1,'-'],
['-',9,'-','-','-','-',4,'-','-']];

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

$('span').on('click', function(event) {
  var el = event.target;
  if (el.tagName === 'P') {
    el = el.parentElement;
  }
  var x = Number(el.classList[0].slice(1));
  var y = Number(el.classList[1].slice(1));
  console.log(mySudoku.board[x][y].potentials);
});

$('#getPotentials').on('click', function() {
  mySudoku.getPotentials();
});

$('#ascendAll').on('click', function() {
  mySudoku.ascendAll();
});

$('#bruteForce').on('click', function() {
  mySudoku.bruteForce();
});
