"use strict";

GameStates.makeGame = function( game, shared ) {
    //variables

    var player1 = null;
    var player2 = null;
    var timer = null;
    var score = 0;
    var timer1 = null;
    var background = null;
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');
    }

    return {
    
        create: function () {
    
            background = game.add.sprite(0,0,'WhiteBackground');
            player1 = game.add.sprite(200,300,'BlackPlayer');
            player2 = game.add.sprite(400,300,'Tagger');

            
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            
          
        },
    
        update: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            
        }
    };
};