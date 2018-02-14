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
    game.state.add('StateA', StateA);
	game.state.add('StateB', StateB);
	game.state.start('StateA');
	
	var StateA =
    {
		function preload() 
		{
			// Load an image
			game.load.spritesheet( 'playButton', 'assets/PlayButton.png', 200, 100);
		}
    
		var button;
	
	
		function create() 
		{
			button = game.add.button(game.world.centerX-50,400,'playButton', actionOnClick, 2,1,0);
		}
	
		function actionOnClick()
		{
			game.state.start('StateB');
		}
	
		function update()
		{
		
		}
	}
	
	var StateB =
	{
		function preload() 
		{
			// Load an image
			game.load.spritesheet( 'playButton', 'assets/PlayButton.png', 200, 100);
		}
    
		function create() 
		{
			game.stage.backgroundColor = '#182d3b';
		}
	
		function update()
		{
		
		}	
	}
};
