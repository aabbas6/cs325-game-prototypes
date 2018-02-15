"use strict";

window.onload = function() 
{
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
   
	function preload() 
	{
		// Load an image
		game.load.spritesheet( 'playButton', 'assets/PlayButton.png', 200, 100);
		game.load.spritesheet( 'chicken', 'assets/chicken.png',48,48);
		game.load.spritesheet( 'chicken1', 'assets/chicken.png',48,48);
		game.load.image('map', 'assets/map.png', 475,365);
		game.load.audio('squawk','assets/chickenSFX.mp3');
		//game.load.spritesheet( 'nature', 'assets/Nature.png',48,48);
	}
	var button;
	var player;
	var start;
	var player_dir = 'down';
	var enemy_dir = 'down';
	var idle = true;
	var title;
	var cursors;
	var text1,text2,text3;
	var chicken;
	var counter = 1;
	var endgame = 0;
	var chickens;
	var background;
	var timer;
	//var sound;

	function create() 
	{
	//	var style = { font: "40px Verdana", fill: "#4444ee", align: "center" };
	//	title = game.add.text(game.world.centerX-140,15, "Chicken Hunt", style);
	//	button = game.add.button(game.world.centerX-100,400,'playButton', actionOnClick, 2,1,0);
	//	style = { font: "20px Verdana", fill: "#4444ee", align: "center" };
	//	text1 = game.add.text(50, 200, "Due to Vegitarians taking over the world,",style);
	//	text2 = game.add.text(50,240, "There was scarcity on plants causing the animals to become omnivores.",style);
	//	text3 = game.add.text(50,280, "Now, the chickens are on its way to become the top of the food chain.",style);
		game.physics.startSystem(Phaser.Physics.P2JS);
		
		game.physics.p2.setImpactEvents(true);
		game.physics.p2.restitution = 0.8;
		background = game.add.sprite(0,0, 'map');
		background.scale.setTo(1.7,1.7);
		var chickenCollisionGroup = game.physics.p2.createCollisionGroup();
		var playerCollisionGroup = game.physics.p2.createCollisionGroup();
		timer= game.time.create(false);
		timer.loop(20000, playSound, this);
		timer.start();

		game.physics.p2.updateBoundsCollisionGroup();
	//	sound = game.add.audio('squawk');

	//	game.sound.setDecodedCallback(sound, start, this);
		
		chickens = game.add.group();
		chickens.enableBody = true;
		chickens.physicsBodyType = Phaser.Physics.P2JS;

		for( var i = 0; i<5; i++)
		{
			var chicken = chickens.create(game.world.randomX, game.world.randomY, 'chicken1');
			var rand = game.rnd.realInRange(.5,1);
			chicken.body.fixedRotation = true;
			chicken.scale.setTo(rand,rand);
			chicken.body.setRectangle(rand,rand);
			chicken.body.setCollisionGroup(chickenCollisionGroup);
			chicken.body.collides([chickenCollisionGroup, playerCollisionGroup]);
		}

		player = game.add.sprite(game.world.centerX, game.world.centerY, 'chicken');
		player.animations.add('down',[6,7,8], 10, true);
		player.animations.add('left',[18,19,20], 10, true);
		player.animations.add('right',[30,31,32], 10, true);
		player.animations.add('up',[42,43,44],10, true);
		
		game.physics.p2.enable(player, false);
		game.physics.enable( player, Phaser.Physics.ARCADE);
		player.body.fixedRotation = true;
		player.body.setRectangle(48,48);
		player.body.setCollisionGroup(playerCollisionGroup);
		player.body.collides(chickenCollisionGroup, eatEnemy, this);
	
		
		cursors = game.input.keyboard.createCursorKeys();
	}
	
	function playSound()
	{
		sound.play();
	}

	function eatEnemy(body1, body2)
	{
		counter++;
		endgame++;
		if(endgame>=5)
		{
			endGame();
		}
		game.add.tween(player.scale).to( {x: counter, y: counter }, 1000, Phaser.Easing.Linear.Default,true,0,0,false);
		body2.sprite.alpha = 0;
	}

	function endGame()
	{
			var style = { font: "40px Verdana", fill: "#4444ee", align: "center" };
			title = game.add.text(game.world.centerX,15, "Level 1 Done", style);
			player.kill();

	}
	/*function actionOnClick()
	{
		
		title.kill();
		text1.kill();
		text2.kill();
		text3.kill();
		button.kill();
	}*/
	
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
				player.frame = 19;
			}
			else if(idle == true && player_dir == 'right')
			{
				player.frame = 30;
			}
			else if(idle == true && player_dir == 'up')
			{
				player.frame = 43;
			}
			else if(idle == true && player_dir == 'down')
			{
				player.frame = 7;
			}
		}
	}
};
