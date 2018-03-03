"use strict";

GameStates.makeGame2 = function( game, shared ) {
    // Create your own variables.
    var player1 = null;
    var player2 = null;
    var timer = null;
    var timer1 = null;
    //background
    var background = null;
    var map = null;
    var layer = null;
    var border = null;
    var backgroundWhite = true;

    var cursor = null;
    var upC, downC, rightC, leftC;
    var P2IsIt = true;
    var P1Score = 0;
    var P2Score = 0;
    var score1 = null;
    var score2 = null;
    var winnerText = null;
    var music = null;
    var map = null;
    var layer = null;
    //end game
    function quitGame()
    {
        music.stop();
        player1.destroy();
        player2.destroy();
        timer.stop();
        timer1.stop();
        P1Score = 0;
        P2Score = 0;
        background.destroy();
        border.destroy();
    }
    return {
    
        create: function () 
        {
            game.physics.startSystem(Phaser.Physics.ARCADE);
            
            music = game.add.audio('StealthMusic');
            music.play();
            background = game.add.sprite(0,0,'WhiteBackground');
            //border = game.add.sprite(0,0,'RedBorder');
            map = game.add.tile('level1');
            level1.addTilesetImage('Tagger');
            layer = map.createLayer('Tile Layer 1');
            layer.resizeWorld();
            map.setCollision(1);          
            game.physics.p2.convertTilemap(map,layer);
            game.physics.p2.restitution = 0.5;


            player1 = game.add.sprite(200,300,'BlackPlayer');
            player2 = game.add.sprite(600,300,'Tagger');

            //add timer for background change
            timer = game.time.create(false);
		    timer.loop(3000, this.backgroundChange, this);
            timer.start(); 
            //add timer for changing sides
            timer1 = game.time.create(false);
            timer1.loop(10000, this.changeSide, this);
            timer1.start();


            //create keys for W,A,S,D movement
            cursor = game.input.keyboard.createCursorKeys();
            upC = game.input.keyboard.addKey(Phaser.Keyboard.W);
            downC = game.input.keyboard.addKey(Phaser.Keyboard.S);
            rightC = game.input.keyboard.addKey(Phaser.Keyboard.D);
            leftC = game.input.keyboard.addKey(Phaser.Keyboard.A);
            
            //create physics movement for both players
            game.physics.enable( [player1,player2]);
            player1.body.setSize(48,48,0,0);
            player2.body.setSize(48,48,0,0);
            player1.body.onCollide = new Phaser.Signal();
            player1.body.onCollide.add(this.Tagged, this);

            //display Score
            var style = { font: "40px Verdana", fill: "#4444ee", align: "center" };
            score1 = game.add.text(200,100, P1Score);
            score2 = game.add.text(600, 100, P2Score);
        },
        //function that changes the background every 2 seconds
        backgroundChange: function()
        {
            if(backgroundWhite == true)
            {
                game.add.tween(background).to({alpha: 0},2000, Phaser.Easing.Linear.None, true);
                backgroundWhite = false;
            }
            else
            {
                game.add.tween(background).to({alpha:1},2000,Phaser.Easing.Linear.None,true);
                backgroundWhite = true;
            }
        },
    
        update: function () 
        {
            //player1
            player1.body.velocity.x = 0;
            player1.body.velocity.y = 0;
            //player2
            player2.body.velocity.x = 0;
            player2.body.velocity.y = 0;
            //player1 movement
            if(leftC.isDown)
            {
                if(player1.position.x > 20)
				    player1.body.velocity.x = -150;
            }
            else if(rightC.isDown)
            {
                if(player1.position.x<732)
                    player1.body.velocity.x = 150;
            }
            if(upC.isDown)
            {
                if(player1.position.y>20)
                    player1.body.velocity.y = -150;
            }
            else if(downC.isDown)
            {
                if(player1.position.y<532)
                    player1.body.velocity.y = 150;
            }

            //player2 movement
            if(cursor.left.isDown)
            {
                if(player2.position.x > 20)
				    player2.body.velocity.x = -150;
            }
            else if(cursor.right.isDown)
            {
                if(player2.position.x<732)
                    player2.body.velocity.x = 150;
            }
            if(cursor.up.isDown)
            {
                if(player2.position.y>20)
                    player2.body.velocity.y = -150;
            }
            else if(cursor.down.isDown)
            {
                if(player2.position.y<532)
                    player2.body.velocity.y = 150;
            }
            game.physics.arcade.collide(player1,player2);
        },
        changeSide: function()
        {
            if(P2IsIt == true)
            {
                player1.loadTexture('Tagger',0);
                player2.loadTexture('WhitePlayer',0);
                player1.x = 200;
                player1.y = 300;
                player2.x = 600;
                player2.y = 300;
                P2IsIt = false;
            }
            else
            {
                player1.loadTexture('BlackPlayer',0);
                player2.loadTexture('Tagger',0);
                player1.x = 200;
                player1.y = 300;
                player2.x = 600;
                player2.y = 300;
                P2IsIt = true;
            }
        },

        Tagged: function(player1,player2)
        {
            if(P2IsIt == true)
            {
                player1.loadTexture('Tagger',0);
                player2.loadTexture('WhitePlayer',0);
                player1.x = 200;
                player1.y = 300;
                player2.x = 600;
                player2.y = 300;
                P2Score++;
                score1.setText(P1Score);
                score2.setText(P2Score);
                P2IsIt = false;
            }
            else
            {
                player1.loadTexture('BlackPlayer',0);
                player2.loadTexture('Tagger',0);
                player1.x = 200;
                player1.y = 300;
                player2.x = 600;
                player2.y = 300;
                P1Score++;
                score1.setText(P1Score);
                score2.setText(P2Score);
                P2IsIt = true;
            }
            if(P1Score == 5)
            {
                var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
                winnerText = game.add.text(game.world.centerX, game.world.centerY, 'P1 Wins', style);
                quitGame();
            }
            else if(P2Score == 5)
            {
                var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
                winnerText = game.add.text(game.world.centerX, game.world.centerY, 'P2 Wins', style);
                quitGame();
            }
            timer.stop();
            timer = game.time.create(false);
            timer.loop(2000, this.backgroundChange,this);
            timer.start();
            timer1.stop();
            timer1 = game.time.create(false);
            timer1.loop(10000, this.changeSide, this);
            timer1.start();
        },
        render: function()
        {
            game.debug.text('Changing Tagger At: ' + timer1.duration.toFixed(0), 32, 32);
        }
    };
};
