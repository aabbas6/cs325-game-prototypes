"use strict";

GameStates.makePreloader = function( game ) {

	var preloadBar = null;

	var ready = false;

    return {
    
        preload: function () {
    
            //	These are the assets we loaded in Boot.js
            //	A nice sparkly background and a loading progress bar
            preloadBar = game.add.sprite(300, 400, 'loadBar');
    
            //	This sets the preloadBar sprite as a loader sprite.
            //	What that does is automatically crop the sprite from 0 to full-width
            //	as the files below are loaded in.
            game.load.setPreloadSprite(preloadBar);
    
            //	Here we load the rest of the assets our game needs.
            game.load.spritesheet('Button', 'assets/PlayButton.png',200,100);
            game.load.spritesheet('Stage1','assets/stage1.png',96,96);
            game.load.spritesheet('Stage2','assets/stage2.png',96,96);
            game.load.spritesheet('Stage3','assets/stage3.png',96,96);
            game.load.audio('StealthMusic', ['assets/stealmusic.mp3']);
            game.load.image('BlackPlayer','assets/blackhider.png');
            game.load.image('WhitePlayer','assets/whitehider.png');
            game.load.image('tagger','assets/tagger.png');
            game.load.image('WhiteBackground','assets/whitebackground.png');
            game.load.image('BlackBackground','assets/blakbackground.png');
            game.load.image('RedBorder','assets/redborder.png');
            game.load.tilemap('level1','assets/stealth1.csv',null,Phaser.Tilemap.CSV);
            game.load.tilemap('level2','assets/stealth2.csv',null,Phaser.Tilemap.CSV);
            game.load.tilemap('level3','assets/stealth3.csv',null,Phaser.Tilemap.CSV);
        },
    
        create: function () 
        {
    
            //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
            preloadBar.cropEnabled = false;
    
        },
    
        update: function () {
    
            //	You don't actually need to do this, but I find it gives a much smoother game experience.
            //	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
            //	You can jump right into the menu if you want and still play the music, but you'll have a few
            //	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
            //	it's best to wait for it to decode here first, then carry on.
            
            //	If you don't have any music in your game then put the game.state.start line into the create function and delete
            //	the update function completely.
            
            if (game.cache.isSoundDecoded('StealthMusic') && ready == false)
            {
                ready = true;
                game.state.start('MainMenu');
            }
    
        }
    
    };
};
