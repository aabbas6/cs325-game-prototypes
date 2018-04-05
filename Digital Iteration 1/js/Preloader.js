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
            game.load.spritesheet('Button', 'assets/playButton.png',200,100);
            game.load.spritesheet('craftButton','assets/craftButton.png',200,100);
            game.load.spritesheet('gatherButton', 'assets/gatherButton.png',200,100);
            game.load.spritesheet('fightButton','assets/endButton.png',200,100);
            game.load.image('boss','assets/Orc.png');
            game.load.image('ore','assets/ore.png');
            game.load.image('tree','assets/tree.png');
            game.load.image('armor','assets/armor.png');
            game.load.image('axe','assets/axe.png');
            game.load.image('pickaxe','assets/pickaxe.png');
            game.load.image('weapon','assets/punysword.png');
            game.load.audio('Gathering', ['assets/64.mp3']);
            game.load.audio('Crafting',['assets/86.mp3']);
            game.load.audio('Adventure',['assets/29.mp3']);
            game.load.audio('Boss',['assets/103.mp3']);
            game.load.audio('GameOver',['assets/156.mp3']);
            game.load.audio('Win',['assets/117.mp3']);
            
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
            
            if (game.cache.isSoundDecoded('Win') && game.cache.isSoundDecoded('Boss') &&game.cache.isSoundDecoded('Gathering') && game.cache.isSoundDecoded('Crafting') && game.cache.isSoundDecoded('Adventure') && ready == false)
            {
                ready = true;
                game.state.start('MainMenu');
            }
    
        }
    
    };
};
