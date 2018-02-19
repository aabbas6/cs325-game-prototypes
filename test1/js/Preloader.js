"use strict";

GameStates.makePreloader = function( game )
{
    var loadingbar = null;
    var ready = null;

    return{

        preload: function()
        {
            //add the loading bar preloaded from Boot.js
            loadingbar = game.add.sprite(84,48, 'Bar');

            //set Preloader
            game.load.setPreloadSprite(loadingbar);

            //preload all assets
            game.load.spritesheet('Button', 'assets/PlayButton.png');
            game.load.audio('StealthMusic', ['assets/stealmusic.png']);
            game.load.image('BlackPlayer','assets/blackhider.png');
            game.load.image('WhitePlayer','assets/whitehider.png');
            game.load.image('Tagger','assets/tagger.png');
            game.load.image('WhiteBackground','assets/whitebackground.png');
            game.load.image('BlackBackground','assets/blackbackground.png');
            game.load.image('RedBorder','assets/redborder.png');
            

        },

        create: function()
        {
             //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
            preloadBar.cropEnabled = false;
        },

        update: function()
        {
            //	If you don't have any music in your game then put the game.state.start line into the create function and delete
            //	the update function completely.

            if (game.cache.isSoundDecoded('StealthMusic') && ready == false)
            {
                ready = true;
                game.state.start('Title');
            }
        }

    };
};