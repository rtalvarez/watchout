// start slingin' some d3 here.

var svg = d3.select('body').append('svg')
  .attr('class', 'gameboard')
  .append('g');

var boardWidth = 800;
var boardHeight = 800;
var numEnemies = 15;


var Circle = function(x, y) {
  var instance = Object.create(Circle.prototype);
  instance.radius = 10;
  instance.diameter = 20;
  instance.cx = x || Math.random() * ((boardWidth - instance.diameter) - instance.diameter) + instance.diameter;
  instance.cy = y || Math.random() * ((boardHeight - instance.diameter) - instance.diameter) + instance.diameter;
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

var playerData = [Circle(boardWidth / 2, boardHeight / 2)];

var players = svg.selectAll('circle.player')
                 .data(playerData);

players.enter().append('circle')
  .style('fill', 'blue')
  .attr('class', 'player')
  .attr('r', function(d) { return d.radius; })
  .attr('cx', function(d) { return d.cx; })
  .attr('cy', function(d) { return d.cy; });
// Create circles
// Put them inside array for d3 to work on

var enemyData = [];

for (var i = 0; i < numEnemies; i++){
  enemyData.push(Circle());
}

var enemies = svg.selectAll('circle.enemy')
                .data(enemyData);

enemies.enter().append('circle');

enemies
  .attr('class', 'enemy')
  .style('fill', function(node) { return node.color; })
  .attr('r', function(d) { return d.radius; })
  .attr('cx', function(d) { return d.cx; })
  .attr('cy', function(d) { return d.cy; });


var update = function(data){
// Get all circles from svg and append new data
//debugger;
  var enemies = svg.selectAll('circle.enemy')
    .data(data);

  enemies
  .transition().duration(1500)
  .attr('cx', function(d){
    d.randomMove();
    return d.cx;
  })
  .attr('cy', function(d){ return d.cy; });
};

setInterval(function() {
  update(enemyData);
}, 1000);


d3.select('svg').on('mousemove', function() {
  var coordinates = d3.mouse(this);
  players.attr('cx', coordinates[0]).attr('cy', coordinates[1]);
});
