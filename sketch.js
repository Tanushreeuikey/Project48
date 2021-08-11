const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;


var bg,bg2,bg3,bg4,form,system,code,security;
var playButton,playButtonImg;
var aladin,aladinn,coin,coin_img,coinGroup,i=0;
var score=0;
var level=0;
var coinScore=0;
var PLAY=1
var END=0
var gameState= PLAY;

function preload() {
 
  
  bg= loadImage("aladdin_cave.jpg")
  bg2=loadImage("treasure.jpg")
  bg3=loadImage("Aladdin-Disney.jpg")
  bg4=loadImage("cavePlay.jpg")
  playButtonImg=loadImage("gameplay.png")
  coin_Img=loadAnimation("coin1.png","coin2.png","coin3.png","coin4.png","coin5.png","coin6.png","coin7.png",)
}

function setup() {
  createCanvas(1000,500);
  engine = Engine.create();
  world = engine.world;

  security = new Security();
  system = new System();
  
  coinGroup= new Group()
  aladin= new Aladin(100,100,50,50)
  
}

function draw() {
  background(bg);
Engine.update(engine);

if(level === 0)
  {clues();
  security.display();
  textSize(20);
  fill("white");
  text("Score: " + score, 450, 50);}
// add code for changing the background to the treasure background
  

  if(score === 3 ) 
{
    level = 1;
    clear()
    background(bg4)
    //image(bg4,-500,0,1000,500)
    //image(bg4,500,0,1000,500)

    playButton=createSprite(500,300,50,50)
    playButton.addImage(playButtonImg)
    playButton.scale=0.50

    playButton.visible=true;

    if(mousePressedOver(playButton) && level ===1)

{ 
  background(bg2)
      //playButton.visible=false;
      play();
     
      
       

    }
}
    



   



  
  drawSprites()
}


      

function play()
{
  aladin.display();


  aladinn=createSprite(aladin.body.position.x+60,aladin.body.position.y+20,20,70)
  aladinn.visible=false; 

  camera.position.x=aladin.body.position.x
  camera.position.y=height/2

  console.log(aladinn.x)

  if(keyDown(RIGHT_ARROW))
  {
  Matter.Body.setPosition(aladin.body,{x:aladin.body.position.x+5,y:aladin.body.position.y+0})
  }

  if(keyDown(UP_ARROW))
  {
  Matter.Body.setPosition(aladin.body,{x:aladin.body.position.x+0,y:aladin.body.position.y-5})
  }

  if(keyDown(DOWN_ARROW))
  {
  Matter.Body.setPosition(aladin.body,{x:aladin.body.position.x+0,y:aladin.body.position.y+5})
  }

  textSize(20);
  fill("white");
  var pos = aladin.body.position.x+350
  text("Score: " + coinScore,pos , 50);

  spawnCoin();


  if(coinGroup.isTouching(aladinn))
  {
    coinScore+=10;
    coinGroup.get(i)
    coinGroup[i].destroy()
  }
  if(coinScore === 20)
  {
    level=2
    clear()
      background(bg3)
      image(bg3,200,200,1000,500)
  }


/*if(level === 2)
{
  background(bg3)
      image(bg3,500,200,1000,500)

      coinGroup.setLifetimeEach(1)
      coinGroup.setVelocityXEach(0)
      
}*/
}

function spawnCoin()
{
  if(frameCount%50===0)
{
     var pos = aladin.body.position.x+600
     coin=createSprite(pos,random(20,480),20,20)
     coin.addAnimation("round",coin_Img)
     coin.scale=0.080
     coinGroup.add(coin);
     coin.lifetime= 500
}

}