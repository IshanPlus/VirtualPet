//Create variables here
var database;
var dog, dogImg, happyDog, dogHappy;
var foods, foodStock;
function preload()
{
	dogImg = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  
  dog = createSprite(250, 300, 50, 50);
  dog.addImage(dogImg);
  dog.scale = 0.1;

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() {  
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)){
    writeStock(foods);
    dog.addImage(dogHappy);
  }

  drawSprites();
  
  fill("black");
  text("Food remaining : " + foods, 200, 220);
  textSize(15);
  text("Press UP_ARROW key to feed the dog!", 130, 50);

}

function readStock(data){
  foods = data.val()
}

function writeStock(x){

  if (x<=0){
    x = 0;
  }else{
    x = x-1;
  }


  database.ref('/').update({
    Food:x
  })
}



