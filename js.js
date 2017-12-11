function createBlocks() {
  for (var i = 0; i < 9; i++) {
    var div = document.createElement('div');
    div.setAttribute('id', i);
    $('#sudoku').append(div);
  }
}

var arr = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];

createBlocks();

for (var i = 0; i < 9; i++) {
  for (var j = 0; j < 9; j++) {
    var span = document.createElement('span');
    var num = i * 9 + j;
    span.classList.add('v' + i);
    span.classList.add('h' + j);
    var line = arr[Math.floor(num / 27)]
    num = num % 9;
    var id = line[Math.floor(num / 3)];
    $(`#${id}`).append(span);
  }
}
