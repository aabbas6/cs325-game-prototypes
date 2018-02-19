"use strict";
var DigitalGame3 = {};

DigitalGame3.makeBoot = function(game)
{
    return{
        init: function()
        {
             //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
             game.input.maxPointers = 1;
            //pause if window is not focused
            game.stage.disableVisibilityChange = true;

            if (game.device.desktop)
            {
                //  If you have any desktop specific settings, they can go in here
                game.scale.pageAlignHorizontally = true;
            }
            else
            {
                //  Same goes for mobile settings.
                //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
                game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                game.scale.setMinMax(480, 260, 1024, 768);
                game.scale.forceLandscape = true;
                game.scale.pageAlignHorizontally = true;
            }
        },
        
        preload: function () {
            //load assets for preloader state
            game.load.image('Bar','assets/loadbar.png');
        },
    
        create: function () {
    
            //  By this point the preloader assets have loaded to the cache, we've set the game settings
            //  So now let's start the real preloader going
            game.state.start('Preloader');
        }    

    };
};