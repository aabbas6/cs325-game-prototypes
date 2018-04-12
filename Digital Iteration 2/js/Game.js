"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var craftButton;
    var gatherButton;
    var fightButton;
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
    //Background
    var craftFloor;
    var craftWall;
    var tentFloor;
    var tentWall;
    var gatherFloor;
    var gatherWall;
    var bossFloor;
    var bossWall;
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
    var pickAxeCost;
    var axeCost;
    var weaponCost;
    var armorCost;
    var menumusic;
    var gatheringmusic;
    var craftingmusic;
    var bossmusic;
    var endStatus;
    var Fanfare;
    var GOMusic;
    var sfx1;
    var sfx2;
    var sfx3;
    var sfx4;
    //Boss
    var Boss;
    var HP;
    return {
    
        create: function () 
        {
            game.physics.startSystem(Phaser.Physics.ARCADE);
            game.stage.backgroundColor = "#A0522D" ;
            var style = { font: "30px Verdana", fill: "#FFFFFF", align: "center" };
            var fount = { font: "15px Verdana", fill: "#FFFFFF", align: "center"};
            tentFloor = game.add.sprite(0,0,'Camp');
            tentWall = game.add.sprite(0,0, 'CampWall');
            craftFloor = game.add.sprite(0,0,'WoodFloor');
            craftWall = game.add.sprite(0,0,'Metal');
            gatherFloor = game.add.sprite(0,0,'Meadow');
            gatherWall = game.add.sprite(0,0,'Forest');
            bossFloor = game.add.sprite(0,0,'Dirt');
            bossWall = game.add.sprite(0,0,'Wasteland');
            menumusic = game.add.audio("Adventure");
            craftingmusic = game.add.audio("Crafting");
            gatheringmusic = game.add.audio("Gathering");
            sfx2 = game.add.audio("Rock");
            sfx3 = game.add.audio("Wood");
            sfx4 = game.add.audio("Slash");
            bossmusic = game.add.audio("Boss");
            sfx1 = game.add.audio('Hammer');
            menumusic.play();

            //initialize
            craftButton = game.add.button(100, 400, 'craftButton', this.craftStart, this, 2,0,1);
            gatherButton = game.add.button(310, 400, 'gatherButton', this.gatherStart, this, 2,0,1);
            fightButton = game.add.button(520,400, 'fightButton',this.bossFight,this,2,0,1);
            fightButton.visible = false;
            Boss = game.add.button(300, 150, 'boss',this.damage,this);
            Boss.visible = false;
            Ore = game.add.button(game.world.centerX - 200, game.world.centerY-100, 'ore', this.metalAdd,this);
            Tree = game.add.button(game.world.centerX + 100, game.world.centerY-100,'tree', this.woodAdd,this);
            Axe = game.add.button(150,200, 'axe',this.levelAxe,this);
            pickAxe = game.add.button(150,400,'pickaxe',this.levelPickAxe,this);
            Armor = game.add.button(450,200, 'armor',this.levelArmor,this);
            Weapon = game.add.button(450,400, 'weapon',this.levelWeapon,this);

            //set Icons
            pickaxeIcon = game.add.sprite(150,100,'pickaxe');
            pickaxeIcon.scale.setTo(0.5,0.5);
            axeIcon = game.add.sprite(300, 100, 'axe');
            axeIcon.scale.setTo(0.5,0.5);
            armorIcon = game.add.sprite(450,100,'armor');
            armorIcon.scale.setTo(0.5,0.5);
            weaponIcon = game.add.sprite(600,100,'weapon');
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
            PickAxeLvM = game.add.text(200, 100, ": " + pickAxeLv,style);
            AxeLvM = game.add.text(350,100, ": "+ AxeLv,style);
            ArmorLvM = game.add.text(500,100, ": "+ ArmorLv,style);
            WeaponLvM = game.add.text(650,100, ": "+ WeaponLv,style);
         
            //set visibility them to false
            Ore.visible = false;
            Tree.visible = false;
            pickAxe.visible = false;
            Axe.visible = false;
            Armor.visible = false;
            Weapon.visible = false;      
            craftFloor.visible = false;
            craftWall.visible = false;
            gatherFloor.visible = false;
            gatherWall.visible = false;
            bossFloor.visible = false;
            bossWall.visible = false;
        }
        ,
        craftStart: function()
        {
            menumusic.stop();
            craftingmusic.play();
            this.switchMenu();
            game.time.events.add(Phaser.Timer.SECOND * 5, this.endCraft, this);
            tentFloor.visible = false;
            tentWall.visible = false;
            craftFloor.visible = true;
            craftWall.visible = true;
            pickAxe.visible = true;
            Axe.visible = true;
            Armor.visible = true;
            Weapon.visible = true;
            axeCost = game.add.text(250,200, "Metal Cost: " + (AxeLv * 1) + "\nWood Cost: " + (AxeLv * 4));
            pickAxeCost = game.add.text(250,400, "Metal Cost:  "+ (pickAxeLv * 2) + "\nWood Cost: " + (pickAxeLv * 3));
            armorCost = game.add.text(550,200, "Metal Cost: " + (ArmorLv * 5));
            weaponCost = game.add.text(550,400, "Metal Cost: " + (WeaponLv * 4) + "\nWoodCost: " + (WeaponLv * 1));

        },
        gatherStart: function()
        {
            menumusic.stop();
            gatheringmusic.play();
            this.switchMenu();
            tentFloor.visible = false;
            tentWall.visible = false;
            gatherFloor.visible = true;
            gatherWall.visible = true;
            game.time.events.add(Phaser.Timer.SECOND * 3, this.endGather, this); 
            Ore.visible = true;
            Tree.visible = true;
            //Ore.inputEnabled = true;
            //Tree.inputEnabled = true;
        },
          endCraft:function()
        {
            DayCount++;
            dayMessage1.setText("Day: "+ DayCount);
            this.switchMenu();
            tentFloor.visible = true;
            tentWall.visible = true;
            craftFloor.visible = false;
            craftWall.visible = false;
            axeCost.setText("");
            pickAxeCost.setText("");
            armorCost.setText("");
            weaponCost.setText("");
            pickAxe.visible = false;
            Axe.visible = false;
            Armor.visible = false;
            Weapon.visible = false;
            craftingmusic.stop();
            menumusic.play();
        },
        endGather:function()
        {
            //day increment
            DayCount++;
            dayMessage1.setText("Day: "+ DayCount);
            tentFloor.visible = true;
            tentWall.visible = true;
            gatherFloor.visible = false;
            gatherWall.visible = false;
            this.switchMenu();
            Ore.visible = false;
            Tree.visible = false;
            gatheringmusic.stop();
            menumusic.play();
        },
        metalAdd:function()
        {
            sfx2.play();
            metalCount += pickAxeLv;
            metalCountM.setText("Metal: "+ metalCount);
        },
        woodAdd:function()
        {
            sfx3.play();
            woodCount += AxeLv;
            woodCountM.setText(" Wood: "+ woodCount);
        },
        levelPickAxe: function()
        {
            if( (metalCount>= (pickAxeLv * 2)) && (woodCount>= (pickAxeLv * 3)) )
            {
                metalCount = metalCount - (pickAxeLv * 2);
                metalCountM.setText("Metal: "+ metalCount);
                woodCount = woodCount - (pickAxeLv * 3);
                woodCountM.setText(" Wood: "+ woodCount);
                pickAxeLv++;
                PickAxeLvM.setText(": " + pickAxeLv);
                pickAxeCost.setText("Metal Cost:  "+ (pickAxeLv * 2) + "\nWood Cost: " + (pickAxeLv * 3));
                sfx1.play();
            }
        },
        levelAxe: function()
        {
            if((metalCount>= (AxeLv * 1)) && (woodCount>= (AxeLv * 4)))
            {
                metalCount = metalCount - (AxeLv * 1);
                metalCountM.setText("Metal: "+ metalCount);
                woodCount = woodCount - (AxeLv * 4);
                woodCountM.setText("Wood Count: " + woodCount);
                AxeLv++;
                AxeLvM.setText(": " + AxeLv);
                axeCost.setText("Metal Cost: " + (AxeLv * 1) + "\nWood Cost: " + (AxeLv * 4));
                sfx1.play();
            }

        },
        levelWeapon: function()
        {
            if( (metalCount>= (WeaponLv * 4)) && (woodCount>= (WeaponLv * 1)))
            {
                metalCount = metalCount - (WeaponLv * 4);
                metalCountM.setText("Metal: "+ metalCount);
                woodCount = woodCount - (WeaponLv * 1);
                woodCountM.setText("Wood Count: " + woodCount);
                WeaponLv++;
                WeaponLvM.setText(": " + WeaponLv);
                weaponCost.setText("Metal Cost: " + (WeaponLv * 4) + "\nWoodCost: " + (WeaponLv * 1));
                sfx1.play();
            }
        },
        levelArmor: function()
        {
            if(metalCount>=(ArmorLv *5))
            { 
                   metalCount = metalCount - (ArmorLv * 5);
                   metalCountM.setText("Metal: "+ metalCount);
                   ArmorLv++;
                   ArmorLvM.setText(": " + ArmorLv);
                   armorCost.setText("Metal Cost: " + (ArmorLv*5));
                   sfx1.play();
            }
        },
        switchMenu: function()
        {
            if(DayCount<10)
            {
                craftButton.visible =! craftButton.visible;
                gatherButton.visible =! gatherButton.visible;
            }
            else
            {
                fightButton.visible = true;
            }
        },
        bossFight: function()
        {
            fightButton.visible = false;
            menumusic.stop();
            bossmusic.play();
            tentFloor.visible = false;
            tentWall.visible = false;
            bossFloor.visible = true;
            bossWall.visible = true;
            Boss.visible = true;
            HP = 20;
        },
        damage: function()
        {

            HP -= WeaponLv;
            if(HP>0)
            {   
                sfx4.play();
                ArmorLv--;
                ArmorLvM.setText(": " + ArmorLv);
                if(ArmorLv == 0)
                {
                    Boss.visible = false;
                    endStatus = game.add.text(300,300, "You have died!");
                    GOMusic = game.add.audio("GameOver");
                    bossmusic.stop();
                    GOMusic.play();
                    game.time.events.add(Phaser.Timer.SECOND * 10, endMusic.stop(), this);
                   // game.time.events.add(Phaser.Timer.SECOND * 10, game.state.start("MainMenu"),this);

                }
            }
            else
            {
                Boss.visible = false;
                bossmusic.stop();
                Fanfare = game.add.audio("Win");
                Fanfare.play();
                endStatus = game.add.text(100,200, "You have saved the world! Tired from all the work\nyou have done for the past 10 days,\nyou decided to retire a simple life!");
                game.time.events.add(Phaser.Timer.SECOND * 10, endMusic.stop(), this); 
                //game.time.events.add(Phaser.Timer.SECOND * 10, game.state.start("MainMenu"),this);
            }
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
