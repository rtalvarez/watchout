// start slingin' some d3 here.

var svg = d3.select('body').append('svg')
  .attr('class', 'gameboard')
  .append('g');

var Circle = function() {
  var instance = Object.create(Circle.prototype);
  instance.cx = 400;
  instance.cy = 400;
  instance.color = 'red';
  instance.direction = 0;
  return instance;
};

Circle.prototype.getCx = function() {
  return this.cx;
};

// Create circles
// Put them inside array for d3 to work on



var data = [Circle()];

var circle = svg.selectAll('circle').data(data);

circle.enter().append('circle');

circle.style('fill', function(node) { return node.color; })
      .attr('r', 10)
      .attr('cx', function(d) { return d.cx; })
      .attr('cy', function(d) { return d.cy; });

