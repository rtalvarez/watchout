// start slingin' some d3 here.

var svg = d3.select('body').append('svg')
  .attr('class', 'gameboard')
  .append('g');

var boardWidth = 800;
var boardHeight = 800;

//debugger;
var Circle = function() {
  var instance = Object.create(Circle.prototype);
  instance.radius = 10;
  instance.diameter = 20;
  instance.cx = Math.random() * ((boardWidth - instance.diameter) - instance.diameter) + instance.diameter;
  instance.cy = Math.random() * ((boardHeight - instance.diameter) - instance.diameter) + instance.diameter;
  instance.color = 'red';
  instance.direction = 0;
  return instance;
};

Circle.prototype.randomMove = function(){
  // helper function that tells us which wall we're gonna hit
  // depending on the direction and the current position

  this.cx = Math.random() * ((boardWidth - this.diameter) - this.diameter) + this.diameter;
  this.cy = Math.random() * ((boardWidth - this.diameter) - this.diameter) + this.diameter;
};


// Create circles
// Put them inside array for d3 to work on

var data = [];

for (var i = 0; i < 15; i++){
  data.push(Circle());
}

var circle = svg.selectAll('circle')
                .data(data);

circle.enter().append('circle');

circle.style('fill', function(node) { return node.color; })
      .attr('r', function(d) { return d.radius; })
      .attr('cx', function(d) { return d.cx; })
      .attr('cy', function(d) { return d.cy; });


var update = function(data){
// Get all circles from svg and append new data
//debugger;
  var circles = svg.selectAll('circle')
    .data(data);

  circles
  .transition().duration(1000)
  .attr('cx', function(d){
    d.randomMove();
    console.log('test');
    return d.cx;
  })
  .attr('cy', function(d){ return d.cy; });
};

setInterval(function() {
  update(data);
}, 1000);


