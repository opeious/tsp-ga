var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser', { preload: preload, create: create, update: update, render: render  });
var cities;
var cityScale = 0.25;
var population;
var path;

function preload() {

    game.load.image('city', 'img/city.png');
}

function create() {
    cities = game.add.group();
    paths = game.add.group();
    //population = game.add.group();
    //path = game.add.group();  
    /*
    this.game.time.advancedTiming = true;
    this.fpsText = this.game.add.text(10, 10, '',       //fps tracking
    { font: '8px Arial', fill: '#ffffff' });
    */
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
    //city.body.collideWorldBounds = true;     don't need border collisions
    
    return city;
}

var City = function(game, x,y)
{
    Phaser.Sprite.call(this,game,x,y,'city');
    this.anchor.setTo(0.5,0.5);
    
    //this.game.physics.enable(this,Phaser.Physics.ARCADE);    don't need physics bodies
}

City.prototype = Object.create(Phaser.Sprite.prototype);
City.prototype.constructor = City;

City.prototype.update = function() {
    if(!this.alive)
        return;
}

var rePop = function()
{
    population = new Array(slider2Val-1);
    for(var i=0;i<=slider2Val;i++)
    {
        var tempPath = new Array(slider1Val-1);
        for(var l=1;l <= slider1Val-1; l++)
         tempPath[l-1]=l;

        tempPath=shuffle(tempPath);
    
      population[i]=tempPath; 
    }
}