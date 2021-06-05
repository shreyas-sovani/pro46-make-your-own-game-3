
var marioImg,mario,bgImg,marioImg1;
var obstacleImg,groundImg,ground,obstacles,obstaclesGrp,obstaclesImg1;
var coins,coins1,coins2,coins3,coins4,coins5,coinsImg,coinsGrp;
var score=0;
var resetButton,resetButtonImg;
var jumpSound,dieSound,coinCollectedSound,bgmusic;

var GAMESTATE="PLAY";
// var PLAY=1;
// var END=0;


function preload(){

    marioImg=loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png");
    obstacleImg=loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png");
    bgImg=loadImage("bg.png");
    groundImg=loadImage("ground2.png");
    coinsImg=loadImage("coin.png");
    marioImg1=loadImage("collided.png");
    obstaclesImg1=loadImage("obstacle1.png");
    resetButtonImg=loadImage("restart.png");
    jumpSound=loadSound("jump.mp3");
    dieSound=loadSound("die.mp3");
    coinCollectedSound=loadSound("coinCollected.wav");
    bgmusic=loadSound("bgmusic.mp3");



}


function setup(){

createCanvas(700,500);

mario=createSprite(100,380,350,200);
mario.scale=1.7;
mario.addAnimation("mario",marioImg);
//mario.debug=true;
mario.setCollider("rectangle",0,0,25,30)

ground=createSprite(350,455,700,70);
ground.scale=1.1;

resetButton=createSprite(350,250,10,10);
resetButton.visible=false;
resetButton.addImage(resetButtonImg);

ground.addImage(groundImg);

obstaclesGrp=createGroup();

coinsGrp=createGroup();





}

function draw(){

background(bgImg);

if(GAMESTATE==="PLAY"){

if(ground.x<200){
    ground.x=350;
}



//bgmusic.play();

if(keyDown("space")&&mario.y>=360){
    mario.velocityY=-15;
    jumpSound.play();
}

mario.velocityY=mario.velocityY+0.8;

for(var i=0 ; i<coinsGrp.length ; i++){

if(coinsGrp.get(i).isTouching(mario)){
     score+=1;
     coinsGrp.get(i).remove();
     coinCollectedSound.play();
}
}
textSize(20);
fill("red")
text("Score : "+score,500,40);



//
//console.log(mario.y);

ground.velocityX=-5;

// (score>0 && score%10===0){

//     ground.velocityX= ground.velocityX+4;

// }if




obstacle();

coin();

if(mario.isTouching(obstaclesGrp)){
    GAMESTATE="END";
dieSound.play();
    
}


}

mario.collide(ground);
//console.log(GAMESTATE)
if(GAMESTATE==="END"){

    ground.velocityX=0;
    mario.velocityY=0;
    obstaclesGrp.setVelocityXEach(0);
    coinsGrp.setVelocityXEach(0) ;
    mario.addAnimation("mario",marioImg1);
    obstacles.addAnimation("obstacleAnimation",obstaclesImg1);
    resetButton.visible=true;
    if(mousePressedOver(resetButton)){
        GAMESTATE="PLAY";
        reset();
    }

   




}


drawSprites();
}


function reset(){

score=0;
mario.addAnimation("mario",marioImg);
 obstacles.addAnimation("obstacleAnimation",obstacleImg);
GAMESTATE="PLAY";
obstaclesGrp.destroyEach();
    coinsGrp.destroyEach();
    resetButton.visible=false;
    


}







function obstacle(){

if(frameCount%130===0){

    obstacles=createSprite(700,380,15,15);
    obstaclesGrp.add(obstacles);
    obstacles.velocityX=-5;
    obstacles.addAnimation("obstacleAnimation",obstacleImg);
    obstacles.scale=1.3
    //obstacles.debug=true;
    obstacles.setCollider("rectangle",0,0,30,40)
}



}

function coin(){

if(frameCount%100===0){

coins=createSprite(760,random(200,280),1,1);
coins.velocityX=-5;
coins.addImage(coinsImg);
coins.scale=0.02;

coinsGrp.add(coins);

coins1=createSprite(720,random(220,350),1,1);
    coins1.velocityX=-5;
    coins1.addImage(coinsImg);
    coins1.scale=0.02
    coinsGrp.add(coins1);



    coins2=createSprite(680,random(220,350),1,1);
    coins2.velocityX=-5;
    coins2.addImage(coinsImg);
    coins2.scale=0.02;
    coinsGrp.add(coins2);



    coins3=createSprite(640,random(220,350),1,1);
    coins3.velocityX=-5;
    coins3.addImage(coinsImg);
    coins3.scale=0.02
    coinsGrp.add(coins3);


    coins4=createSprite(600,random(220,350),1,1);
    coins4.velocityX=-5;
    coins4.addImage(coinsImg);
    coins4.scale=0.02
    coinsGrp.add(coins4);



}


}

















