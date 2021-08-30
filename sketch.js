var hypnoticBall, db;
var position;


function setup()
{
  createCanvas(500,500);

  db = firebase.database(); //creating reference to the database. Variable db points to the database

  hypnoticBall = createSprite(250,250,10,10);
  hypnoticBall.shapeColor = "red";


  var hypnoticBallPosition = db.ref('ball/position'); //ref() function is used to refer root or child node in the database
  hypnoticBallPosition.on("value", readPosition, showError); //on() method is called each time when the database is updated. 
}                                                             //This method reads and listens for changes to the referenced location in the database

function draw()
{
  background("white");
  
  if(position !== undefined)
  {
    if(keyDown(LEFT_ARROW))
    {
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW))
    {
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW))
    {
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW))
    {
      writePosition(0,+1);
    }
    drawSprites();
  }
}

function writePosition(x,y)
{
  db.ref('ball/position').set({'x': hypnoticBall.x + x ,'y': hypnoticBall.y + y}); //set() method writes data to a specified reference replacing any existing data at that path
}

function readPosition(data) 
{
  position = data.val(); 
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError() //showError() method will be called when there is an error while reading data from the database
{
  console.log("Error in reading the database");
}
