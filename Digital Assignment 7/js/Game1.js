"use strict";

GameStates.makeGame1 = function( game, shared ) {
    // Create your own variables.
    var player = null;
    var timer = null;
    var cursor = null;
    var greenButton = null;
    var blueButton = null;
    var boulder = null;
    var arrow = null;
    var pitfall = null;
    var broken = null;

    //background
    var background = null;
    var map = null;
    var layer = null;
    var backgroundOn = true;
    var music = null;
    var layer = null;
    //end game
    function quitGame()
    {
  
    }
  
    return {
    
        create: function () 
        {
           game.physics.startSystem(Phaser.Physics.ARCADE);
           //music

           //background
            background = game.add.sprite(0,0,'Background1');
            game.stage.backgroundColor = "#0000FF" ;
            //timer for background change
            timer = game.time.create(false);
            timer.loop(5000, this.backgroundChange,this);
            timer.start();
            //map
            map = game.add.tilemap('level1', 48, 48);
            map.addTilesetImage('tagger');
            layer = map.createLayer(0);
            layer.resizeWorld();
            map.setCollisionBetween(0,0);

            //player
            player = game.add.sprite(60,440, 'Player');
            game.physics.enable(player);
            player.body.setSize(48,48,0,0);
            player.body.onCollide = new Phaser.Signal();
            player.body.onCollide.add(this.resetLevel, this);
            //system
            cursor = game.input.keyboard.createCursorKeys();
        },
        //function that changes the background every 2 seconds
        backgroundChange: function()
        {
            if(backgroundOn == true)
            {
                game.add.tween(background).to({alpha: 0},2000, Phaser.Easing.Linear.None, true);
                backgroundOn = false;
            }
            else
            {
                game.add.tween(background).to({alpha:1},2000,Phaser.Easing.Linear.None,true);
                backgroundOn = true;
            }
        },
        
        //function to reset level
        resetLevel: function()
        {

        },
        update: function () 
        {
            game.physics.arcade.collide(player, layer);
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
            //player movement
            if(cursor.left.isDown)
            {
                if(player.position.x > 20)
				    player.body.velocity.x = -150;
            }
            else if(cursor.right.isDown)
            {
                if(player.position.x<732)
                    player.body.velocity.x = 150;
            }
            if(cursor.up.isDown)
            {
                if(player.position.y>20)
                    player.body.velocity.y = -150;
            }
            else if(cursor.down.isDown)
            {
                if(player.position.y<532)
                    player.body.velocity.y = 150;
            }
        },

       

        
        render: function()
        {
            //game.debug.text('Changing Background: ' + timer.duration.toFixed(0), 10, 10);
        }
    }
};
