"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var player1 = null;
    var player2 = null;
    var timer = null;
    var timer1 = null;
    var background = null;
    var border = null;
    var backgroundWhite = true;
    var cursor = null;
    var upC, downC, rightC, leftC;
    var P2IsIt = true;
    var P1Score = 0;
    var P2Score = 0;
    var score1 = null;
    var score2 = null;
    return {
    
        create: function () 
        {
            game.physics.startSystem(Phaser.Physics.ARCADE);

            background = game.add.sprite(0,0,'WhiteBackground');
            border = game.add.sprite(0,0,'RedBorder');
            player1 = game.add.sprite(200,300,'BlackPlayer');
            player2 = game.add.sprite(600,300,'Tagger');

            //add timer for background change
            timer= game.time.create(false);
		    timer.loop(3000, this.backgroundChange, this);
            timer.start(); 
            
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
            player1.body.onCollide.add(this.changeSide, this);

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
        changeSide: function(player1,player2)
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
        },
        render: function()
        {
            game.debug.text('Time until event: ' + timer.duration.toFixed(0), 32, 32);
        }
    };
};