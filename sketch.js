var PLAY = 1;
var END = 0;
var gameState = PLAY;

var shinchan, shinchan_running, shinchan_collided;
var ground, invisibleGround, groundImage;
var home;
var gameState="start";
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;



function preload(){
  shinchan_running =   loadAnimation("Running 1.png","Running 2.png","Running 3.png","Running 4.png");
  shinchan_collided = loadAnimation("Running 1.png");
  
  city_background = loadImage("city.png");
 forest_background = loadImage("forest.png");  
 desert_background = loadImage("desert.png");

  city_obstacle1 = loadImage("City1.png");
  city_obstacle2 = loadImage("City2.png");
  city_obstacle3 = loadImage("City3.png");
  city_obstacle4 = loadImage("City4.png");
  desert_obstacle1 = loadImage("desert obstacle.png");
  desert_obstacle2 = loadImage("Desert obstacle 2.png");
  forest_obstacle1 = loadImage("Forest obstacle.png");
  forest_obstacle2 = loadImage("Forest obstacle 2.png");
  intro1 = loadImage("intro 1.png");
  intro2 = loadImage("Into 2.png");
  gameOverImg = loadImage("game over.png");
  restartImg = loadImage("Restart.png");
  homeImg=loadImage("home.jpg")

 startImg = loadImage("Start.png")

}

function setup() {
  createCanvas(1450, 680);
  
  bg=createSprite(725,320);
  bg.addImage(city_background);
  bg.scale=3
  bg.velocityX=-4;

  shinchan = createSprite(370,680,20,50);
  
  shinchan.addAnimation("running", shinchan_running);
 // shinchan.addAnimation("collided", shinchan_collided);
  
  
  shinchan.setCollider("circle",0,0,40);
  shinchan.setCollider("rectangle",-180,-60,80,80)
  
  
  story=createSprite(725,340,50,50);
  story.addImage(intro1);
  message=createSprite(725,340,50,50)
  message.addImage(intro2);
  message.visible=false;
  message.scale=1.9;
  playButton=createSprite(displayWidth-250,displayHeight-250,50,20);
  playButton.addImage(startImg);
  playButton.scale=0.5;

  
 gameOver = createSprite(700,400);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(700,640);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.2;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,660,2000,10);
  invisibleGround.visible = false;
  
 

 cityobstaclesGroup = new Group();
 forestobstaclesGroup = new Group();
 desertobstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //shinchan.debug = true;
  background("white");
  drawSprites();
  if(gameState!=="start"){
    textSize(30)
  fill("blue");
  stroke ("white")
  text("SCORE:"+score,900,100)
  }
  shinchan.collide(invisibleGround)

  if(gameState==="start"){
    shinchan.addAnimation("running",shinchan_running);
   shinchan.visible=false;
   bg.visible=false;
   

    if(mousePressedOver(playButton)){
      gameState="play";

    }
  }
   else if(gameState==="play"){
    score=score+Math.round(getFrameRate()/60)
     shinchan.visible = true;
     bg.visible=true;
     message.visible=false;
     story.visible=false;
     playButton.visible=false;
     if(bg.x<0){
       bg.x=700;
     }
     if(frameCount<1000){
      cityObstacles();
     }
     else if(frameCount>1000 && frameCount<2000)
     {
       forestObstacles();

     }
     else if(frameCount>2000 && frameCount<3000)
     {
       desertObstacles();
       
     }
     else if(frameCount>3000 && frameCount<4000)
     {
       forestObstacles();
       
     }
     else if(frameCount>4000 && frameCount<5000)
     {
       cityObstacles();
       
     }
     else if(frameCount>5000){
       reachedHome();
     
     }
     if(keyDown("space")&&shinchan.y>670){
       shinchan.velocityY=-10;

     }
     shinchan.velocityY=shinchan.velocityY+0.3;
     
   }
   if(shinchan.isTouching(cityobstaclesGroup)|| shinchan.isTouching(forestobstaclesGroup)|| shinchan.isTouching(desertobstaclesGroup))
  {
    gameState="END";
   shinchan.velocityY=0;
  }
  if(gameState==="END"){
   shinchan.addAnimation("running",shinchan_collided)
    bg.velocityX=0;

    gameOver.visible=true;
    restart.visible=true;
    cityobstaclesGroup.setVelocityXEach(0);
    forestobstaclesGroup.setVelocityXEach(0);
    desertobstaclesGroup.setVelocityXEach(0);
if(mousePressedOver(restart))reset();
  }
  
}



function cityObstacles() {
  forestobstaclesGroup.destroyEach();
  desertobstaclesGroup.destroyEach();
  bg.addImage(city_background);
  bg.scale=3;
  bg.y=320;
 
  if(frameCount % 160 === 0) {
    cityobstacle = createSprite(1600,630,10,40);
        cityobstacle.velocityX = -6  
        cityobstacle.setCollider("rectangle",0,0,230,100) 
        
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: cityobstacle.addImage(city_obstacle1);
      cityobstacle.scale=0.5;
      cityobstacle.y=610;
              break;
      case 2: cityobstacle.addImage(city_obstacle2);
      cityobstacle.scale=0.7
              break;
      case 3: cityobstacle.addImage(city_obstacle3);
      cityobstacle.scale=0.8
              break;
      case 4: cityobstacle.addImage(city_obstacle4);
      cityobstacle.scale=0.7
              break;      
      default: break;
    }
    cityobstaclesGroup.add(cityobstacle)
     }
}
function forestObstacles() {
  cityobstaclesGroup.destroyEach();
 
  desertobstaclesGroup.destroyEach();
  bg.addImage(forest_background);
    
  bg.scale=0.75;
  bg.y=400;
 
  if(frameCount % 160 === 0) {
  
   forestobstacle = createSprite(1600,625,10,40);
        forestobstacle.velocityX = -4
        forestobstacle.setCollider("rectangle",0,0,200,150)
       
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: forestobstacle.addImage(forest_obstacle1);
      forestobstacle.scale=0.5     
              break;
      case 2:forestobstacle.addImage(forest_obstacle2);      
      forestobstacle.scale=0.3
              break;                  
      default: break;
    }
    forestobstaclesGroup.add(forestobstacle)
     }
}
function desertObstacles() {
  cityobstaclesGroup.destroyEach();
  forestobstaclesGroup.destroyEach();
 
  bg.addImage(desert_background)
  bg.scale=2.5;
  bg.y=400;
  if(frameCount % 160 === 0) {
    desertobstacle = createSprite(1600,630,10,40);
    desertobstacle .velocityX = -4;
    desertobstacle.setCollider("rectangle",0,0,140,180)
    
      
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: desertobstacle .addImage(desert_obstacle1); 
      desertobstacle .scale=0.5    
              break;
      case 2: desertobstacle .addImage(desert_obstacle2);      
      desertobstacle .scale=0.15
              break;                  
      default: break;
    }
    desertobstaclesGroup.add(desertobstacle)
     }
}
function reset(){
 
  gameOver.visible = false;
  restart.visible = false;
  message.visible = true;
  shinchan.x=370
  cityobstaclesGroup.destroyEach();
  forestobstaclesGroup.destroyEach();
  desertobstaclesGroup.destroyEach();
 frameCount=0;
 bg.velocityX=-4;
  score=0
  
  gameState = "start";
  playButton.visible=true;
 
  
  score = 0;
  
}
function reachedHome(){
 bg.addImage(homeImg);
 bg.scale=2;
 bg.y=340;
 bg.velocityX=0;
 shinchan.velocityX=2;
 flag+=1;
 if(shinchan.x>900){
  shinchan.velocityX=0;
  shinchan.addAnimation("running",shinchan_collided)
  fill ("black");
  textSize(40)
  text ("yay !! reached home",200,300)
  restart.visible=true
  restart.x=200;
  restart.y=400;
 }
 if(mousePressedOver(restart)){
   reset(); 
 }

  cityobstaclesGroup.destroyEach();
  forestobstaclesGroup.destroyEach();
  desertobstaclesGroup.destroyEach();

  
}