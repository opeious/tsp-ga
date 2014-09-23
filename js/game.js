var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser', { preload: preload, create: create, update: update, render: render  });
var boids;
var boidsCG;
var boidImg;
var i;
var conStr;

function preload() {

    game.load.image('boid', 'img/boid.png');
}

function create() {
    boids = game.add.group();
    
    //game.physics.enable(image, Phaser.Physics.ARCADE   ->> enables physics for image
    
    
    
    this.game.time.advancedTiming = true;
    this.fpsText = this.game.add.text(10, 10, '',       //fps tracking
    { font: '8px Arial', fill: '#ffffff' });
    
    
    
  
}

function update()
{
    if (this.game.time.fps !== 0) {
        this.fpsText.setText(this.game.time.fps + ' FPS');   //update fps tracker
    }
    
    
    if(boids.countLiving()<slider1Val)                          //boid population control
    {
        addBoid(game.world.randomX,game.world.randomY);
            boids.setAll('scale.x',0.5);
            boids.setAll('scale.y',0.5);
    
    }
    while(boids.countLiving()>slider1Val){
        var a = boids.getFirstAlive();
        if(a)
         a.kill();
        
    }
    

    
}

function render()
{
}


var addBoid = function(x,y)
{
    var boid = boids.getFirstDead();
    
    if(boid == null)
    {
        boid = new Boid(game);
        boids.add(boid);
    }
    
    boid.revive();
    
    boid.x = x;
    boid.y = y;
    boid.body.collideWorldBounds = true;
    
    return boid;
}


var Boid = function(game, x, y)
{
     Phaser.Sprite.call(this, game, x, y, 'boid');

    // Set the pivot point for this sprite to the center
    this.anchor.setTo(0.5, 0.5);

    // Enable physics on the boids
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    // Define constants that affect motion
    this.SPEED = 100; // missile speed pixels/second
    this.TURN_RATE = 5; // turn rate in degrees/frame
    //this.AVOID_DISTANCE = 30; // pixels  
}

Boid.prototype = Object.create(Phaser.Sprite.prototype);   //Boid is a type of sprite
Boid.prototype.constructor = Boid;

Boid.prototype.update = function() {
    if(!this.alive)
        return;
    
    
    var targetAngle
    // Calculate the angle from the missile to the mouse cursor game.input.x
    // and game.input.y are the mouse position; substitute with whatever
    // target coordinates you need.
    if(slider2Val==0){
        targetAngle = this.game.math.angleBetween(
        this.x, this.y,
        this.game.width/2, this.game.height/2
        );
    }
    else
    {
        //targetAngle = this.game.physics.arcade.angleToPointer(Boid);
            targetAngle = this.game.math.angleBetween(
        this.x, this.y,
        game.input.x, game.input.y
        );
    }
    
    // Gradually (this.TURN_RATE) aim the boids towards the target angle
    if (this.rotation !== targetAngle) {
        // Calculate difference between the current angle and targetAngle
        var delta = targetAngle - this.rotation;

        // Keep it in range from -180 to 180 to make the most efficient turns.
        if (delta > Math.PI) delta -= Math.PI * 2;
        if (delta < -Math.PI) delta += Math.PI * 2;

        if (delta > 0) {
            // Turn clockwise
            this.angle += this.TURN_RATE;
        } else {
            // Turn counter-clockwise
            this.angle -= this.TURN_RATE;
        }

        // Just set angle to target angle if they are close
        if (Math.abs(delta) < this.game.math.degToRad(this.TURN_RATE)) {
            this.rotation = targetAngle;
        }
    }

    // Calculate velocity vector based on this.rotation and this.SPEED
    this.body.velocity.x = Math.cos(this.rotation) * this.SPEED;
    this.body.velocity.y = Math.sin(this.rotation) * this.SPEED;    
}