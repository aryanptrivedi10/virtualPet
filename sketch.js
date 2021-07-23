var dog,sadDog,happyDog;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("Feed the dog");
  Feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}

function draw() {
  background(46,139,87);

  // to show the last feed time in the correct format 
  Fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("lastFeed : "+ lastFed%12 + "PM", 350,30);
  }else if (lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+ lastFed + " AM",350,30);
  }

  //to display time in correct form
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  display(){
    var x=80,y=100;

    imageMode(CENTER);
    image(this.image,720,220,70,70);

    if(this.foodStock!=0){
      for(var i=0;i<this.foodStock;i++){
        if(i%10==0){
          x=80;
          y=y+50;
      }
      image(this.image,x,y,50,50);
      x=x+30;
     
    }
  }

  drawSprites();
}

//function to read food Stock
function feedDog(){
  dog.addImage(happyDog);

  if(foodobj.getFoodStock()<=0){
    foodobj,updateFoodStock(foodobj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodobj.getFoodStock()-1);
  }
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodobj.updateFoodStock(foodobj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodobj.getFoodStock(),
    feedTime:hour()
  })
}


//function to add food in stock
function addFoods(){
  foods++;
  database.ref('/').update({
    Food:foods
  })
}


