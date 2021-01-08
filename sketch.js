var canvas
var dog,dogimg,happydog
var food
var foodata
var database
var backimg
function preload() {
    dogimg=loadImage("Dog.png")
    backimg=loadImage("backimg.jpg")
    happydog=loadImage("happydog.png")
}
function setup(){
 canvas=createCanvas(1000,600)

 database=firebase.database()

dog=createSprite(500,400,10,10)
dog.addImage(dogimg)
dog.scale=0.3

    foodata=database.ref('Food');
    foodata.on("value",readStock);

}
function draw(){
    background(backimg)
    if(keyWentDown("up")){
        writeStock(food)
        dog.addImage(happydog)
    }
    drawSprites()
    textSize(20)
    fill("green")
    text("Press Up Arrow To Feed Dog  ",400,50)
    textSize(20)
    text("Food remaining:"+food,30,50)
}
function readStock(data){
    food=data.val()
    
}
function writeStock(x){
    if(x<=0){
        x=0;
      }else{
        x=x-1;
      } 
    database.ref("/").update({
        Food:x
    })
}