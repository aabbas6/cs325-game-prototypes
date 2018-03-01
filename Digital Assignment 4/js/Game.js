"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
   var player;
   var map;
    var layer;
    //end game
    function quitGame()
    {

    }
    return {
    
        create: function () 
        {
            game.physics.startSystem(Phaser.Physics.P2JS);
            game.stage.backgroundColor = '#6495ed';
            map = game.add.tile('level1');
            level1.addTilesetImage('iceTile');
            layer = map.createLayer('Tile Layer 1');
            layer.resizeWorld();
            map.setCollision(1);          

            game.physics.p2.convertTilemap(map,layer);
            game.physics.p2.restitution = 0.5;
            game.physics.p2.gravity.y = 300;

           // player = game.add.sprite();
        },
        //function that changes the background every 2 seconds
    
        update: function () 
        {
          
        }
    };
};
