// start slingin' some d3 here.

var svg = d3.select('body').append('svg')
  .attr('class', 'gameboard')
  .append('g');

var highScore = 0;
var currentScore = 0;

var boardWidth = 800;
var boardHeight = 800;
var numEnemies = 15;
var collisions = 0;

var throttled = _.throttle(function(){
  collisions++;
  d3.select('.collisions span').text(collisions);
}, 1000, { trailing: false });

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
  // console.log(enemies.attr)
  enemies
  .transition().duration(3000)
  .attr('cx', function(d){
    d.randomMove();
    return d.cx;
  })
  .attr('cy', function(d){ return d.cy; });
};

setInterval(function() {
  update(enemyData);
}, 3000);

setInterval(function() {
  currentScore += 1;
  // console.log([d3.event.x, d3.event.y]);
  d3.select('.current span').text(currentScore);

  // position of the player
  var coordinates = [playerData[0].cx, playerData[0].cy];
  // console.log(coordinates);
  var diameter = enemyData[0].diameter;

  for (var i = 0; i < enemyData.length; i++){
    var enemyCx = enemyData[i].cx;
    var enemyCy = enemyData[i].cy;
    // console.log(enemyCx, enemyCy);

    // xOverlap = coordinates[0] >= enemyCx - diameter && coordinates[0] <= enemyCx + diameter;
    // yOverlap = coordinates[1] >= enemyCy - diameter && coordinates[1] <= enemyCy + diameter;
    if (getDistance(enemyCx, enemyCy, coordinates[0], coordinates[1]) < diameter){
      console.log('collision detected', xOverlap, yOverlap);
      console.log('player coordinates', coordinates);
      console.log('enemy coordinates', [enemyCx, enemyCy]);
      if(currentScore > highScore) {
        highScore = currentScore;
        d3.select('.high span').text(highScore);
      }
      d3.select('.current span').text(currentScore);
      currentScore = 0;
      throttled();
    }
  }
}, 15);

var getDistance = function(firstX, firstY, secondX, secondY) {
  return Math.sqrt(Math.pow(firstX - secondX, 2) + Math.pow(firstY - secondY, 2));
};

d3.select('svg').on('mousemove', function() {
  // console.log(d3.mouse(this));
  // console.dir(this);
  // window.coord = [d3.event.x, d3.event.y];
  var coordinates = d3.mouse(this);
  // console.log(coordinates);
  playerData[0].cx = coordinates[0];
  playerData[0].cy = coordinates[1];


  players.attr('cx', coordinates[0]).attr('cy', coordinates[1]);
});
