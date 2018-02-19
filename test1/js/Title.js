"use strict";

DigitalAssignment3.makeTitle = function(game, shared)
{
    var music = null;
    var playButton = null;

    function startGame(pointer) 
    {
        //start the actual game
        game.state.start('Game');
    }
    return{
        create: function()
        {
            music = game.add.audio('StealthMusic');
            music.play();
            playButton = game.add.playButton(game.world.centerX-100,400, 'Button', startGame,2,1,0);
        },
        
        update: function()
        {

        }
    };
};