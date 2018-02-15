"use strict";

window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image
		game.load.spritesheet( 'Geologist', 'assets/Geologist.png', 48, 48);
		game.load.image('map', 'assets/map.png');
		game.load.spritesheet( 'rock', 'assets/rock.png', 48,48);
    }
    
    var player;
	var background;
	var player_dir = 'down';
	var cursors;
	var idle = true;
	
	
    function create() {
     
		game.physics.startSystem(Phaser.Physics.P2JS);
		
		game.physics.p2.setImpactEvents(true);
		game.physics.p2.restitution = 0.8;
		
		var playerCollisionGroup = game.physics.p2.createCollisionGroup();
		var rockCollisionGroup = game.physics.p2.createCollisionGroup();
		
		game.physics.p2.updateBoundsCollisionGroup();
		
		background = game.add.tileSprite(0,0, 800, 600, 'map');
		background.fixedToCamera = true;
		
		
        var rocks = game.add.group();
		rocks.enableBody = true;
		rocks.physicsBodyType = Phaser.Physics.P2JS;
		for(var i = 0; i<10; i++)
		{
			var rock = rocks.create(game.world.randomX, game.world.randomY, 'rock');
			rock.body.setCircle(15,15);
			rock.body.fixedRotation = true;
			rock.body.setCollisionGroup(rockCollisionGroup);
			rock.body.collides([rockCollisionGroup, playerCollisionGroup]);
		}
		
		player = game.add.sprite(game.world.centerX, game.world.centerY, 'Geologist');
		player.animations.add('down',[0,1,2], 10, true);
        player.animations.add('left',[12,13,14], 10, true);
		player.animations.add('right',[24,25,26], 10, true);
		player.animations.add('up',[36,37,38],10, true);
		
		
		game.physics.p2.enable(player, false);
		player.body.fixedRotation = true;
		player.body.setRectangle(48,48);
		player.body.setCollisionGroup(playerCollisionGroup);
		player.body.collides(rockCollisionGroup, pushRock, this);
		
		cursors = game.input.keyboard.createCursorKeys();
		
		game.physics.enable( player, Phaser.Physics.ARCADE);
		
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#2000ee", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Build something amazing.", style );
        text.anchor.setTo( 0.5, 0.0 );
    }
    
	function pushRock(body1, body2)
	{
	}
	
    function update() 
	{
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;
		idle = true;
		
        if( cursors.left.isDown)
		{
			if(player.position.x > 0)
			{
				player.body.velocity.x = -100;
			}
			idle = false;
			if(player_dir != 'left')
			{
				player.animations.play('left');
				player_dir = 'left';
			}
		}
		else if ( cursors.right.isDown)
		{
			if( player.position.x < 800)
			{
				player.body.velocity.x = 100;
			}
			idle = false;
			if(player_dir != 'right')
			{
				player.animations.play('right');
				player_dir = 'right';
			}
		}
		else if ( cursors.down.isDown)
		{
			if(player.position.y < 600)
			{
				player.body.velocity.y = 100;
			}
			idle = false;
			if(player_dir != 'down')
			{
				player.animations.play('down');
				player_dir = 'down';
			}
		}
		else if( cursors.up.isDown)
		{
			if(player.position.y > 0)
			{
				player.body.velocity.y = -100;
			}
			idle = false;
			if(player_dir != 'up')
			{
				player.animations.play('up');
				player_dir = 'up';
			}
		}
		else
		{
			if(idle == true && player_dir == 'left')
			{
				player.frame = 13;
			}
			else if(idle == true && player_dir == 'right')
			{
				player.frame = 25;
			}
			else if(idle == true && player_dir == 'up')
			{
				player.frame = 37;
			}
			else if(idle == true && player_dir == 'down')
			{
				player.frame = 1;
			}
		}
    }
};
