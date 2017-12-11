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

function checkCluster(n) {
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

function checkRow(n) {
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

function checkCol(n) {
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
