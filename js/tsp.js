var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser', { preload: preload, create: create, update: update, render: render  });
var cities;
var cityScale = 0.25;
var population;
var path;
var pathDrawingDelay = 0.1;
var populated=0;



var noOfIterations = 100;  //number of generations per iteration
var mutationChance  = 50; //in %


function preload() {

    game.load.image('city', 'img/city.png');
}

function create() {
    cities = game.add.group();
    paths = game.add.group();
    small = game.add.group();

    /*
    this.game.time.advancedTiming = true;
    this.fpsText = this.game.add.text(10, 10, '',       //fps tracking
    { font: '8px Arial', fill: '#ffffff' });
    */
    while(cities.countLiving()<slider1Val)
    {
        addCity(game.world.randomX,game.world.randomY);
        cities.setAll('scale.x',cityScale);
        cities.setAll('scale.y',cityScale);
        
    }
    while(cities.countLiving()>slider1Val)
    {
        var killCity = cities.getFirstAlive();
        if(killCity)
         killCity.kill();
        
    }
    population = new Array(slider2Val-1);
    rePop();
}

function update()
{
    
    /*
    if (this.game.time.fps !== 0) {
        this.fpsText.setText(this.game.time.fps + ' FPS');   //update fps tracker
    }
    */
    
    if(cities.countLiving()<slider1Val)
    {
        addCity(game.world.randomX,game.world.randomY);
        cities.setAll('scale.x',cityScale);
        cities.setAll('scale.y',cityScale);
    }
    while(cities.countLiving()>slider1Val)
    {
        var killCity = cities.getFirstAlive();
        if(killCity)
         killCity.kill();
    }
    
    
    drawSmallestPath();
    
    
}

function render()
{

}

var addCity = function(x,y)
{
    var city = cities.getFirstDead();
    
    if(city == null)
    {
        city = new City(game);
        cities.add(city);
    }
    
    city.revive();
    
    city.x = x;
    city.y = y;

    return city;
}

var City = function(game, x,y)
{
    Phaser.Sprite.call(this,game,x,y,'city');
    this.anchor.setTo(0.5,0.5);
}

City.prototype = Object.create(Phaser.Sprite.prototype);
City.prototype.constructor = City;

City.prototype.update = function() {
    if(!this.alive)
        return;
}

var nextGen = function()
{
    for(var a=0;a<noOfIterations; a++)    
    {
        
      var parent1 = population[returnSmallestPath()];
      var parent2 = population[returnSecondSmallestPath()];
      var replacement1 = population[returnLongestPath()];
      var replacement2 = population[returnSecondLongestPath()];
      
      var child1 = parent1.slice();
      var child2 = parent2.slice();
      
      //do child generation
      //crossover
      //mutation
       
        
 
     
     //crossover(child1,child2);
      mutation(child1);
      mutation(child2);
     
        
    if(fitness(population[returnLongestPath()])>fitness(child1.slice()))         
     population[returnLongestPath()] = child1.slice();
   if(fitness(population[returnSecondLongestPath()])>fitness(child2.slice()))                 
     population[returnSecondLongestPath()] = child2.slice();
     
     //replacement2 = child2;
    }
    
    console.log('Current smallest path: ');
    logPath(population[returnSmallestPath()]);
    
    
    
    
}

var crossover = function(path1,path2)
{
    var path1First = new Array(path1.length()+1);
    var path1Second = new Array(path1.length()+1);
    path1First[0]=0;
    path1Second[path1Second.length()]=0;
    for(var i=1;i<path1.length();i++)
        path1First[i]=path1[i-1];
    
    for(i=0;i<path1.length()-1;i++)
        path1Second[i]=path1[i+1];
}


var logPath = function(path)
{
      var testString = '0 ';
      for(var i=0;i<=slider1Val-2;i++)
      {
          testString += path[i];                //  block for testing paths (log)
          testString += ' ';
      }
      var test=fitness(path);
      console.log(testString,'0 : ',fitness(path),'\n');
    
    
    testString += '0 : ';
    testString += fitness(path);
    testString += '\n';
    
    document.getElementById('logger').innerHTML = testString;
}


var mutation = function(path)
{
    var mutateP = Math.floor(Math.random()*100);
    if(mutateP>mutationChance)                              //do nothing - mutation chance
        return;
    
    var i = Math.floor(Math.random()*(slider1Val-1));
    var j = Math.floor(Math.random()*(slider1Val-1));    
    var t = path[i];
    path[i] = path[j];
    path[j] = t;
};


var rePop = function()
{
    
    
    for(var z=0;z<slider2Val;z++)
    {
        var tempPath = new Array(slider1Val-1);
        for(var l=1;l <= slider1Val-1; l++)
         tempPath[l-1]=l;

        tempPath=shuffle(tempPath);
      
      population[z]=tempPath; 

    }
}




var returnSmallestPath = function()
{
    var smallestPath=0;
    for(var z=1;z<slider2Val;z++)
    {
          if(fitness(population[z])<fitness(population[smallestPath]))
              smallestPath=z;
    }
    return smallestPath;
}

var returnSecondSmallestPath = function()
{
    var smallestPath = returnSmallestPath();
    var secondSmallestPath=0;
    
    if(smallestPath==secondSmallestPath)
     secondSmallestPath=1;
    
    for(var z=1;z<slider2Val;z++)
    {
          if(z==smallestPath)
              continue;
          if(fitness(population[z])<fitness(population[secondSmallestPath]))
              secondSmallestPath=z;
    }
    return secondSmallestPath;
}

var returnLongestPath = function()
{
    var smallestPath=0;
    for(var z=1;z<slider2Val;z++)
    {
          if(fitness(population[z])>fitness(population[smallestPath]))
              smallestPath=z;
    }
    return smallestPath;
}

var returnSecondLongestPath = function()
{
    var smallestPath = returnLongestPath();
    var secondSmallestPath=0;
    
    if(smallestPath==secondSmallestPath)
     secondSmallestPath=1;
    
    for(var z=1;z<slider2Val;z++)
    {
          if(z==smallestPath)
              continue;
          if(fitness(population[z])>fitness(population[secondSmallestPath]))
              secondSmallestPath=z;
    }
    return secondSmallestPath;
}

var drawSmallestPath = function()
{
    drawPath(population[returnSmallestPath()]);  
    logPath(population[returnSmallestPath()]);
}

var drawPath = function(path)
{
    var tempCity;
    tempCity = cities.getAt(0);
    tempCity.scale.x = 1;
    tempCity.scale.y = 1;
    tempCity.tint = 0xee2d2e;
    var line = new Phaser.Line;
    
    line.fromSprite(cities.getAt(0),cities.getAt(path[0]));
    game.debug.geom(line);    
    for(var i=0;i<=slider1Val-3;i++)
    {
     
     line.fromSprite(cities.getAt(path[i]),cities.getAt(path[i+1]));
     game.debug.geom(line);    
    }
    


    line.fromSprite(cities.getAt(path[i]),cities.getAt(0));
    game.debug.geom(line);

}


var fitness = function(tempPath)
{
    var ret=0;
    var tempCity1,tempCity2;
    var start;
    
    for(var i=0;i<slider1Val-3;i++)
    {
        tempCity1 = cities.getAt(tempPath[i+1]);
        tempCity2 = cities.getAt(tempPath[i+2]);
        ret += distance(tempCity1,tempCity2);
    }
    
    ret += distance(cities.getAt(0),cities.getAt(tempPath[1]));
    ret += distance(cities.getAt(0),cities.getAt(tempPath[slider1Val-2]));
    
    //var lin1 = new Phaser.Line;
    //lin1.fromSprite(cities.getAt(0),cities.getAt(tempPath[1]));
    //game.debug.geom(lin1);
    return ret;
}

var distance = function(city1,city2)
{
    return Math.sqrt((city2.x - city1.x)*(city2.x - city1.x)+(city2.y-city1.y)*(city2.y-city1.y));
}
