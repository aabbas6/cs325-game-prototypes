"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var craftButton;
    var gatherButton;
    //Day
    var DayCount;
    //Gather Nodes
    var Ore;
    var Tree;
    //Equip
    var pickAxe;
    var Axe;
    var Armor;
    var Weapon;
    //Stats
    var metalCount;
    var woodCount;
    var pickAxeLv;
    var AxeLv;
    var WeaponLv;
    var ArmorLv;
    var HP;
    //Icon
    
    return {
    
        create: function () 
        {
            game.physics.startSystem(Phaser.Physics.ARCADE);
            //initialize
           /* craftButton = game.add.craftButton(100, 400, 'craftButton', craftStart, this, 2,1,0);
            gatherButton = game.add.gatherButton(100, 400, 'gatherButton', gatherStart, this, 2,1,0);
            Ore = game.add.sprite(game.world.centerX - 100, game.world.centerY, 'ore');
            Tree = game.add.sprite(game.world.centerY + 100, game.world.centerY,'tree');

            //create Stats
            metalCount = 0;
            woodCount = 0;
            pickAxeLv = 1;
            AxeLv = 1;
            WeaponLv = 1;
            ArmorLv = 1;
            HP = 10;
            DayCount = 1;
            //create on Input Command
            Ore.events.onInputDown.add(metalAdd,this);
            Tree.events.onInputDown.add(woodAdd,this);
            pickAxe.events.onInputDown.add(levelPickAxe,this);
            Axe.events.onInput.add(levelAxe,this);
            Armor.events.onInput.add(levelArmor,this);
            Weapon.events.onInput.add(levelWeapon,this);
            //set them to false
            Ore.visible = false;
            Tree.visible = false;
            pickAxe.visible = false;
            Axe.visible = false;
            Armor.visible = false;
            Weapon.visible = false;
            */
        }
        ,
        craftStart:function()
        {
            /*
            switchMenu();
            game.time.events.add(Phaser.Timer.SECOND * 30, endCraft, this);
            
            pickAxe.visible = true;
            Axe.visible = true;
            Armor.visible = true;
            Weapon.visible = true;
            */
        },
        gatherStart:function()
        {
            /*
            switchMenu();

            game.time.events.add(Phaser.Timer.SECOND * 30, endGather, this); 
            Ore.visible = true;
            Tree.visible = true;
            Ore.inputEnabled = true;
            Tree.inputEnabled = true;
        },
        endCraft:function()
        {
            DayCount++;

            switchMenu();

            pickAxe.visible = true;
            Axe.visible = true;
            Armor.visible = true;
            Weapon.visible = true;

            pickAxe.inputEnabled = true;
            Axe.inputEnabled = true;
            Armor.inputEnabled = true;
            Weapon.inputEnabled = true;
        },
        endGather:function()
        {
            //day increment
            DayCount++;
            switchMenu();
            Ore.visible = false;
            Tree.visible = false;
            Ore.inputEnabled = false;
            Tree.inputEnabled = false;
        },
        metalAdd:function()
        {
            metalCount += PickAxeLv;
        },
        woodAdd:function()
        {
            woodCount += AxeLv;
        },
    
        levelPickAxe: function()
        {
            if( (metalCount>= (pickAxeLv * 2)) && (woodCount>= (pickAxeLv * 3)) )
            {
                metalCount = metalCount - (pickAxeLv * 2);
                woodCount = woodCount - (pickAxeLv * 3);
                pickAxeLv++;
            }
        },
        levelAxe: function()
        {
            if((metalCount>= (AxeLv * 1)) && (woodCount>= (AxeLv * 4)))
            {
                metalCount = metalCount - (AxeLv * 1);
                woodCount = woodCount - (AxeLv * 4);
                AxeLv++;
            }
        },
        levelWeapon: function()
        {
            if( (metalCount>= (WeaponLv * 3)) && (woodCount>= (WeaponLv * 1)))
            {
                metalCount = metalCount - (WeaponLv * 3);
                woodCount = woodCount - (WeaponLv * 1);
                weaponLv++;
            }
        },
        levelArmor: function()
        {
            if(metalCount>=(armorLv *5))
            { 
                   metalCount = metalCount - (armorLv * 5);
                   armorLv++;
            }
        },
        switchMenu:function()
        {
            craftButton.visible =! craftButton.visible;
            gatherButton.visible =! gatherButton.visible;
            craftButton.inputEnabled =! craftButton.inputEnabled;
            gatherButton.inputEnabled =! gatherButton.inputEnabled;
        },
        update:function()
        {
            if(DayCount>29)
            {
                gameOver();
            }*/
        }
        
    };
};
