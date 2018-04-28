"use strict";

GameStates.makeGame1 = function( game, shared ) {
    // Create your own variables.
    var player = null;
    var timer = null;
    var cursor = null;
    var greenBall1 = null;
    var greenBall2 = null;
    var blueBall1 = null;
    var blueBall2 = null;
    
    var blueButton1 = null;
    var blueButton2 = null;
    var blueBoulder = null;
    var greenBoulder = null;
    var greenArrow = null;
    var blueArrow = null;
    var greenPitfall = null;
    var bluePitfall = null;
    var pitfall = null;

    //background
    var background = null;
    var map = null;
    var layer = null;
    var backgroundOn = true;
    var music = null;
    var layer = null;
    
    //system
    var score = 0;
    var timerScore = null;
    var timerTrap = null;
    var highScore = 0;
    var textScore = 0;
    var textHighScore = 0;
    var DeathMessage = null;
    var music = null;
    var sfx = null;
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
            timer.loop(3000, this.backgroundChange,this);
            timer.start();
            //timer for Score adding
            timerScore = game.time.create(false);
            timerScore.loop(1000, this.timeUp, this);
            timerScore.start();
            //timer for creating pitfall at random stages
            timerTrap = game.time.create(false);
            timerTrap.loop(5000, this.createTrap, this);
            timerTrap.start();
            music = game.add.audio('hype');
            music.loopFull(0.6);
            sfx = game.add.audio('buzz');

            //map
            map = game.add.tilemap('level1', 48, 48);
            map.addTilesetImage('tagger');
            layer = map.createLayer(0);
            layer.resizeWorld();
            map.setCollisionBetween(0,0);

           //create traps
            greenPitfall = game.add.sprite(game.rnd.integerInRange(48,700), game.rnd.integerInRange(48,450), 'greenPitfall');
            bluePitfall = game.add.sprite(game.rnd.integerInRange(48,700), game.rnd.integerInRange(48,450), 'bluePitfall');

            //balls that bounce around
            greenBall1 = game.add.sprite(600,200, 'greenButton');
            greenBall2 = game.add.sprite(100,100, 'greenButton');
            blueBall1 = game.add.sprite(100,400, 'blueButton');
            blueBall2 = game.add.sprite(600,400, 'blueButton');

          
            //enable physics
            game.physics.enable([greenBall1,greenBall2,blueBall1,blueBall2]);
            game.physics.enable([greenPitfall,bluePitfall]);

            greenBall1.body.velocity.setTo(300,300);
            greenBall2.body.velocity.setTo(250,-250);
            blueBall1.body.velocity.setTo(300,300);
            blueBall2.body.velocity.setTo(250,-250);

            greenBall1.body.bounce.setTo(1,1);
            greenBall2.body.bounce.setTo(1,1);
            blueBall1.body.bounce.setTo(1,1);
            blueBall2.body.bounce.setTo(1,1);

            //player
            player = game.add.sprite(game.world.centerX, game.world.centerY, 'Player');
            
            game.physics.enable(player);
            player.body.setSize(48,48,0,0);
            player.body.onCollide = new Phaser.Signal();
            player.body.onCollide.add(this.resetLevel, this);
            //system
            cursor = game.input.keyboard.createCursorKeys();
            var style = {font: "15px Verdana", fill: "#000000", align: "center"};
            textScore = game.add.text(100,78, "Score: " + score, style);
            textHighScore = game.add.text(600,78, "High Score: " + highScore, style);
            DeathMessage = game.add.text(200, 78, "", style);
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
        
        createTrap: function()
        {
            if(backgroundOn == true)
            {
                bluePitfall.x = game.rnd.integerInRange(48, 650);
                bluePitfall.y = game.rnd.integerInRange(48, 450);
            }
            else
            {
                greenPitfall.x = game.rnd.integerInRange(48,650);
                greenPitfall.y = game.rnd.integerInRange(48, 450);
            }
        },

        timeUp: function()
        {
            score++;
            textScore.setText("Score: " + score);
        },
        //function to reset level
        resetLevel: function(sprite1, sprite2)
        {
            player.x = game.world.centerX;
            player.y = game.world.centerY;
            greenBall1.x = game.rnd.integerInRange(400,600);
            greenBall1.y = game.rnd.integerInRange(100,200);
            greenBall2.x = game.rnd.integerInRange(100,200);
            greenBall2.y = game.rnd.integerInRange(100,200);
            blueBall1.x = game.rnd.integerInRange(100, 200);//100
            blueBall1.y = game.rnd.integerInRange(400, 500);//400
            blueBall2.x = game.rnd.integerInRange(400,600);//600
            blueBall2.y = game.rnd.integerInRange(400,500);;//400
            greenBall1.body.velocity.setTo(game.rnd.integerInRange(150,300), game.rnd.integerInRange(150,300));
            greenBall2.body.velocity.setTo(game.rnd.integerInRange(-300,-150), game.rnd.integerInRange(-300,-150));
            blueBall1.body.velocity.setTo(game.rnd.integerInRange(-300,-150), game.rnd.integerInRange(-300,-150));
            blueBall2.body.velocity.setTo(game.rnd.integerInRange(150,300), game.rnd.integerInRange(150,300));
            greenPitfall.x = game.rnd.integerInRange(48,650);
            greenPitfall.y = game.rnd.integerInRange(48, 450);
            bluePitfall.x = game.rnd.integerInRange(48, 650);
            bluePitfall.y = game.rnd.integerInRange(48, 450);
            sfx.play();
            if(score > highScore)
            {
                highScore = score;
            }
            score = 0;
            textScore.setText("Score:" + score);
            textHighScore.setText("High Score: " + highScore);
            if(sprite2 == greenBall1 || sprite2 == greenBall2)
                DeathMessage.setText("You got hit by: Green Ball");
            else if(sprite2 == blueBall1 || sprite2 == blueBall2)
                DeathMessage.setText("You got hit by: Blue Ball");
            else if(sprite2 == bluePitfall || sprite2 == greenPitfall)
                DeathMessage.setText("You fell at a pitfall trap");
        },
        update: function () 
        {
            game.physics.arcade.collide([player,greenBall1,greenBall2,blueBall1,blueBall2], layer);
            game.physics.arcade.collide(player,[greenBall1,greenBall2,blueBall1,blueBall2,greenPitfall,bluePitfall]);
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
            bluePitfall.body.velocity.x = 0;
            bluePitfall.body.velocity.y = 0;
            greenPitfall.body.velocity.x = 0;
            greenPitfall.body.velocity.y = 0;
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
