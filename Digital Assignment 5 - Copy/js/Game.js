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
    //Icon
    var pickaxeIcon;
    var axeIcon;
    var weaponIcon;
    var armorIcon;
    //System
    var displayDay = false;
    var dayMessage1;
    var dayMessage2;
    var metalCountM;
    var woodCountM;
    var AxeLvM;
    var PickAxeLvM;
    var WeaponLvM;
    var ArmorLvM;

    return {
    
        create: function () 
        {
            game.physics.startSystem(Phaser.Physics.ARCADE);
            var style = { font: "30px Verdana", fill: "#9999ff", align: "center" };
            //initialize
            craftButton = game.add.button(100, 400, 'craftButton', this.craftStart, this, 2,0,1);
            gatherButton = game.add.button(310, 400, 'gatherButton', this.gatherStart, this, 2,0,1);
            Ore = game.add.button(game.world.centerX - 200, game.world.centerY-100, 'ore', this.metalAdd,this);
            Tree = game.add.button(game.world.centerX + 100, game.world.centerY-100,'tree', this.woodAdd,this);
            Axe = game.add.sprite(150,150, 'axe');
            Axe.visible = false;
            pickAxe = game.add.sprite(300,150,'pickaxe');
            pickAxe.visible = false;
            Armor = game.add.sprite(150,300, 'armor');
            Armor.visible = false;
            Weapon = game.add.sprite(300,300, 'weapon');
            Weapon.visible = false;
            //set Icons
            pickaxeIcon = game.add.sprite(150,150,'pickaxe');
            pickaxeIcon.scale.setTo(0.5,0.5);
            axeIcon = game.add.sprite(300, 150, 'axe');
            axeIcon.scale.setTo(0.5,0.5);
            armorIcon = game.add.sprite(450,150,'armor');
            armorIcon.scale.setTo(0.5,0.5);
            weaponIcon = game.add.sprite(600,150,'weapon');
            weaponIcon.scale.setTo(0.5,0.5);
    
            //create Stats
            metalCount = 0;
            woodCount = 0;
            pickAxeLv = 1;
            AxeLv = 1;
            WeaponLv = 1;
            ArmorLv = 1;
            DayCount = 1;
            //set Message
            dayMessage1 = game.add.text(game.world.centerX - 40, 20, "Day: " + DayCount,style);
            metalCountM = game.add.text(120, 50, "Metal:" + metalCount, style);
            woodCountM = game.add.text(520, 50, "Wood: " + woodCount, style);
            PickAxeLvM = game.add.text(200, 150, ": " + pickAxeLv,style);
            AxeLvM = game.add.text(350,150, ": "+ AxeLv,style);
            ArmorLvM = game.add.text(500,150, ": "+ ArmorLv,style);
            WeaponLvM = game.add.text(650,150, ": "+ WeaponLv,style);
            //create on Input Command
           
            //pickAxe.events.onInputDown.add(this.levelPickAxe,this);
            //Axe.events.onInput.add(levelAxe,this);
            //Armor.events.onInput.add(levelArmor,this);
            //Weapon.events.onInput.add(levelWeapon,this);
            //set them to false
            Ore.visible = false;
            Tree.visible = false;
            pickAxe.visible = false;
            Axe.visible = false;
            Armor.visible = false;
            Weapon.visible = false;          
        }
        ,
        craftStart: function()
        {
            this.switchMenu();
            pickAxe.visible = true;
            Axe.visible = true;
            Armor.visible = true;
            Weapon.visible = true;
        },
        gatherStart: function()
        {
            this.switchMenu();

            //game.time.events.add(Phaser.Timer.SECOND * 30, endGather, this); 
            Ore.visible = true;
            Tree.visible = true;
            //Ore.inputEnabled = true;
            //Tree.inputEnabled = true;
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
            metalCount += pickAxeLv;
            metalCountM.setText("Metal: "+ metalCount);
        },
        woodAdd:function()
        {
            woodCount += AxeLv;
            woodCountM.setText(" Wood: "+ woodCount);
        },
    /*
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
        */
        switchMenu: function()
        {
            pickaxeIcon.visible =! pickaxeIcon.visible;
            //pickAxeLvM.visible =! pickAxeLvM.visible;
            axeIcon.visible =! axeIcon.visible;
            //AxeLvM.visible =! AxeLvM.visible;
            armorIcon.visible =! armorIcon.visible;
            //ArmorLvM.visible =! ArmorLvM.visible;
            weaponIcon.visible =! weaponIcon.visible;
            //WeaponLvM.visible =! weaponLv.visible;
            craftButton.visible =! craftButton.visible;
            gatherButton.visible =! gatherButton.visible;
            craftButton.inputEnabled =! craftButton.inputEnabled;
            gatherButton.inputEnabled =! gatherButton.inputEnabled;
        },
        update:function()
        {
           // if(displayFalse == false)
           // {
              //  displayFalse == true;
           // }
        }
        };
};
