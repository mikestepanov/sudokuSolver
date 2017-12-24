var Element = function(id, origin, cluster, horizontal, vertical) {
    this.id =  id;
    this.origin = origin;
    this.cluster = cluster;
    this.horizontal = horizontal;
    this.vertical = vertical;
    this.potentials = [];
    this.potentialValue;
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
    this.potentialValue =  arr[pos];
    return arr[pos];
  }
};
