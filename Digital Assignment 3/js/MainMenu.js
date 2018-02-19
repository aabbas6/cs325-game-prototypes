"use strict";

GameStates.makeMainMenu = function( game, shared ) {

	var music = null;
	var playButton = null;
    
    function startGame(pointer) 
    {
        //	And start the actual game
        game.state.start('Game');

    }
    
    return {
    
        create: function () 
        {
    
            //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
            //	Here all we're doing is playing some music and adding a picture and button
            //	Naturally I expect you to do something significantly better :)
    
            playButton = game.add.button(game.world.centerX-100,400, 'Button', startGame,2,1,0);    
        }
    };
};
