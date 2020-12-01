//Create variables here
var dog, happyDog;
var DogImg, happyDogImg;
var database;
var foodS, foodStock;

function preload(){
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.2;

}

function draw() {  
  background(46,139,87);

  if (keyDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg)
  }
  //add styles here
  drawSprites();
  textSize(13);
  fill(255,255,255);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  text("NOTE: Press UP_ARROW Key to feed Drago milk!",130,30)

}

//Function to read values from database
function readStock(data){
  foodS = data.val();
}

//Function to write values in database
function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }

  database.ref('/').update({
    Food:x
  })
}
