"use strict";

GameStates.makeMainMenu = function( game, shared ) {

	var music = null;
    var player = null;
    var timer = null;
    var instructions = null;
    var instructions2 = null;
    var backgroundCheck = null;
    var backgroundSprite = null;
    
    
    return {
    
        create: function () 
        {
    
            //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
            //	Here all we're doing is playing some music and adding a picture and button
            //	Naturally I expect you to do something significantly better :)
            var style = { font: "25px Verdana", fill: "#000000", align: "center" };
            backgroundCheck = false;
            backgroundSprite = game.add.sprite(0,0,'WhiteBackground');
            player = game.add.sprite(375,275, 'tagger');
            instructions = game.add.text(150, 200, 'PLAY', style);
            instructions2 = game.add.text(150,250,'OPTION', style);
            timer = game.time.create(false);
            timer.loop(3000, this.backgroundChange, this);
            timer.start(); 
        },
        backgroundChange: function()
        {
            if(backgroundCheck == false)
            {
                instructions.addColor('#ffffff',0)
                instructions2.addColor('#ffffff',0);
                game.add.tween(backgroundSprite).to({alpha: 0},3000, Phaser.Easing.Linear.None, true);
                backgroundCheck = true;
            }
            else
            {
                instructions.addColor('#000000',0)
                instructions2.addColor('#000000',0);
                game.add.tween(backgroundSprite).to({alpha:1},3000,Phaser.Easing.Linear.None,true);
                backgroundCheck = false;
            }
        }
    };
};
