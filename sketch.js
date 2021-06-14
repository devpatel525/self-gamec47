var jetpack,jetpackImg,ob1,ob1Img,ob2,ob2Img,ob3,ob3Img,gameover,gameoverImg,bg,bgImg,restart,restartImg;
var coin,coinImg,coinsGroup,RocketsGroup;

var PLAY=1;
var END=0;
var gameState=PLAY;

var score=0;

function preload(){
   jetpackImg=loadImage("Sprites/BOY.png");
    bgImg=loadImage("Sprites/bg.png");
    bg2Img=loadImage("Sprites/bg2.jfif")
    ob1=loadImage("Sprites/rocket.png");
    ob2=loadImage("Sprites/rocket1.png");
    //ob3=loadImage("Sprites/rocket2.jfif");
    coinImg=loadImage("Sprites/coin.png");
    //ob3Img=loadImage("sprites/ob3.png");
    gameoverImg=loadImage("sprites/gameover.png");
   
    restartImg=loadImage("sprites/restart.png");
}
function setup(){
    createCanvas(1200,600);
bg=createSprite(600,400,1200,800)
bg.addImage(bg2Img);
bg.scale=10.0;

    jetpack=createSprite(60,450,10,10)
    jetpack.addImage(jetpackImg);
    jetpack.scale=0.5;


    coinsGroup=createGroup();
    RocketsGroup=createGroup();
    
gameOver=createSprite(600,250,10,10);
gameOver.addImage(gameoverImg);
gameOver.scale=0.8;
gameOver.visible=false;


restart=createSprite(600,390,10,10);
restart.addImage(restartImg);
restart.scale=0.8
restart.visible=false;


}
function draw(){
    background(25,202,100);


    if(gameState===PLAY){
    bg.velocityX=-4;

    if(bg.x<0){
        bg.x=bg.width/2;
    }

    if(keyDown("space")){
    jetpack.velocityY=-12;
    }

    spawnCoin();
    spawnRockets();

if(coinsGroup.isTouching(jetpack)){
    score=score+10;
    coinsGroup.destroyEach()
}

if(RocketsGroup.isTouching(jetpack)){
    gameState=END;
}
}

else if(gameState===END){
    gameOver.visible=true;
    restart.visible=true
    coinsGroup.destroyEach();
    RocketsGroup.destroyEach();
bg.velocityX=0
}

    jetpack.velocityY=jetpack.velocityY+1;


drawSprites();

textSize(25);
fill ("white");
text("Coins: " +score, 1000,55);


}

function spawnCoin(){
if(frameCount%80===0){coin=createSprite(1200,100,20,20);
coin.addImage(coinImg);
coin.scale=0.2;
coin.velocityX=-5;
coin.y=Math.round(random(250,600));
coin.lifetime=240;
coin.depth=jetpack.depth;
jetpack.depth+=1
coinsGroup.add(coin);
}
}

function spawnRockets(){
if(frameCount%180===0){
rocket=createSprite(1200,400,20,20);
rocket.velocityX=-8;

var rand=Math.round(random(1,3));

switch(rand){

    case 1: rocket.addImage(ob1);
    break;

    case 2: rocket.addImage(ob2);
    break;

    //case 3: rocket.addImage(ob3);
    //break;

    default : break;
}

rocket.scale=0.5;
rocket.lifetime=150;
rocket.depth=jetpack.depth;
jetpack.depth+=1
RocketsGroup.add(rocket);

}
}
