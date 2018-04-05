"use strict";

GameStates.makeMainMenu = function( game, shared ) {

	var music = null;
    var playButton = null;
    var stage1but = null;
    var stage2but = null;
    var stage3but = null;

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
            var style = { font: "15px Verdana", fill: "#9999ff", align: "center" };
            var instructions = game.add.text(200, 100, 'You have 30 days left until the world ends!', style);
            var instructions2 = game.add.text(200,200,'Gather Materials, Craft those Materials, and Defeat the Villain!', style);
            playButton = game.add.button(game.world.centerX-100,400, 'Button', startGame,1,2,0);   

        }
    };
};
