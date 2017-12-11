function createBlocks() {
  for (var i = 1; i <= 9; i++) {
    var div = document.createElement('div');
    div.setAttribute('id', i);
    $('#sudoku').append(div);
  }
}


createBlocks();

// $('div').css('display', 'block');
