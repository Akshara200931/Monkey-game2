var monkey,monkey1,image1,scene,ground,fruit,stones,spawnBanana,spawnStone,b,s,END,PLAY,gameState ,count

function preload (){
monkey1=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")

image1=loadImage("jungle.jpg")
s=loadImage("stone.png")
b=loadImage("banana1.png")
}


function setup() {

  createCanvas(displayWidth-80,displayHeight);
scene=createSprite(200,200,20,20)
scene.addImage(image1)
monkey=createSprite(200,200,20,20)
monkey.addAnimation("monkeyrun",monkey1)
monkey.scale=0.1;
ground=createSprite(200,385,400,5);
ground.visible=false;
  ground.x = ground.width /2;
scene.velocityX=-2;

spawnStone=new Group()
spawnBanana=new Group()
  count=0
  PLAY=1;
  END=0;
 gameState=PLAY

}

function draw () {

if(gameState === PLAY){


if (scene.x <0) {
scene.x=scene.width/2;
}

stroke("white")
fill("white");
  textSize(20);
  text("Score "+count,500,50)
  count=count+Math.round(getFrameRate()/60) 

  




monkey.collide(ground);
monkey.velocityY = monkey.velocityY + 0.8;
  
if(keyDown("space")&& monkey.y >= 260){
 monkey.velocityY = -12 ;  
}
  stone();
  banana();
  
  if(spawnBanana.isTouching(monkey)){
  spawnBanana.destroyEach();
  switch(count){
    case 1: monkey.scale=0.2;
      break;
      case 2: monkey.scale= 1
      break;
       case 3: monkey.scale=0.4
      break;
      default:break;
  }
}        
if(spawnStone.isTouching(monkey)){
gameState = END;
  
}
}
else if(gameState === END){
scene.velocityX=0;
spawnStone.setVelocityXEach(0);
spawnBanana.setVelocityXEach(0);
monkey.velocityX=0;
monkey.velocityY=0;
spawnStone.setLifetimeEach(-1);
spawnBanana.setLifetimeEach(-1);
}

camera.position.x=displayWidth/2
camera.position.y=monkey.x

drawSprites();
 
}

function stone() {
if(frameCount % 300 === 0) {
    var stones = createSprite(400,365,10,40);
    stones.velocityX=-3;
    stones.addImage(s);
    stones.scale = 0.1;
    stones.lifetime = 134;
    spawnStone.add(stones);

  }
  
  
}
function banana() {
if(frameCount % 150 === 0) {
    var fruit = createSprite(400,365,10,40);
    fruit.velocityX=-3;
    fruit.addImage(b);
    fruit.scale = 0.1;
    fruit.lifetime = 134;
    spawnBanana.add(fruit);
    fruit.y = random(120,200);
  }
}

camera.position.x=monkey.x
camera.position.y=displayHeight/2