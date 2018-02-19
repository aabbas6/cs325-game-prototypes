"use strict";
window.onload() = function()
{
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game' );

    var shared = {};

    //Adding States
    game.state.add('Boot', DigitalGame3.makeBoot(game));
    game.state.add('Preloader', DigitalGame3.makePreloader(game));
    game.state.add('Title', DigitalGame3.makeTitle(game,shared));
    game.state.add('Game', DigitalGame3.makeGame(game,shared));

    //Start Game
    game.state.start('Boot');

};
