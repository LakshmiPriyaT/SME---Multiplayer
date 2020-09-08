var player1, database;
var position;
var player2;

function preload(){

}

function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  player1 = createSprite(250,250,10,10);
  player1.shapeColor = "red";


  var player1Position = database.ref('player1/position');
  player1Position.on("value", readPosition, showError);
}

function draw(){
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}

function writePosition(x,y){
  database.ref('player1/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  player1.x = position.x;
  player1.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
