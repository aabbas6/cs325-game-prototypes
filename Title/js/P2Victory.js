"use strict";

GameStates.makeP2Victory = function( game, shared ) {

	var music = null;
    var playButton = null;
    var stage1but = null;
    var stage2but = null;
    var stage3but = null;

    function startGame1(pointer) 
    {
        //	And start the actual game
        game.state.start('Game1');

    }
    function startGame2(pointer) 
    {
        //	And start the actual game
        game.state.start('Game2');

    }
    function startGame3(pointer) 
    {
        //	And start the actual game
        game.state.start('Game3');

    }
    
    return {
    
        create: function () 
        {
    
            //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
            //	Here all we're doing is playing some music and adding a picture and button
            //	Naturally I expect you to do something significantly better :)
            var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
            var victory = game.add.text(200,10, "Player 2 Wins", style);
            var instructions = game.add.text(200, 100, 'P1 Controls: W,A,S,D', style);
            var instructions2 = game.add.text(200,200,'P2: Controls: Directional Keys', style);
            var instructions3 = game.add.text(200,300,'Red Tags the other player',style);

            //playButton = game.add.button(game.world.centerX-100,400, 'Button', startGame,2,1,0);   
            stage1but = game.add.button(100,400, 'Stage1', startGame1, 2,1,0);
            stage2but = game.add.button(200,400, 'Stage2', startGame2, 2,1,0);
            stage3but = game.add.button(300,400, 'Stage3', startGame3, 2,1,0);

        }
    };
};
