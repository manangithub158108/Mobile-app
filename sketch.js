
function preload(){
  boardImg = loadImage('board.png');
  playerJockeyImg = loadImage('playerJockey.png');
  opponentJockeyImg = loadImage('opponentJockey.png');
  jockeyBallImg = loadImage('jockeyBall.png');
  hitSound = loadSound('hitSound.mp3');
}

function setup(){
  createCanvas(280, 530);

  layout = createSprite(width/2, height/2, width, height);
  layout.addImage(boardImg);
  layout.scale = 0.35;

  opponentGoal = createSprite(width/2 - 5, 15, 80, 35);
  opponentGoal.visible = false;
  playerGoal = createSprite(width/2 - 2, 530-25, 80, 35);
  playerGoal.visible = false;
  playerGoal.setCollider('rectangle', 0, 0, 100, 50);

  playerJockey = createSprite(width/2, 490, 10, 10);
  playerJockey.addImage(playerJockeyImg);
  playerJockey.scale = 0.3;
  playerJockey.setCollider('circle', 0, 0, 100);

  jockeyBall = createSprite(width/2 - 7, height/2 - 2, 10, 10);
  jockeyBall.addImage(jockeyBallImg);
  jockeyBall.scale = 0.356;
  jockeyBall.setVelocity(random(10, 15), random(10, 15));
  jockeyBall.setCollider('circle', 0, 0, 50);

  opponentJockey = createSprite(width/2, 110, 10, 10);
  opponentJockey.addImage(opponentJockeyImg);
  opponentJockey.scale = 0.3;
  opponentJockey.setCollider('circle', 0, 0, 100);

  gameState = 1;

  playerScore = 0;
  opponentScore = 0;

}

function draw(){
  background(0);

  playerJockey.x = mouseX;
  playerJockey.y = mouseY;

  edges = createEdgeSprites();
  jockeyBall.bounceOff(edges[0]);
  jockeyBall.bounceOff(edges[1]);
  jockeyBall.bounceOff(edges[2]);
  jockeyBall.bounceOff(edges[3]);

  jockeyBall.bounceOff(playerJockey);
  jockeyBall.bounceOff(opponentJockey);

  opponentJockey.x = jockeyBall.x;

  if(jockeyBall.isTouching(playerJockey)){
    hitSound.play();
  }

  if(jockeyBall.isTouching(opponentJockey)){
    hitSound.play();
  }

  if(gameState === 1 && mousePressedOver(layout)){
    gameState = 2
  }

  drawSprites();

  if(gameState === 1){
    textSize(18);
    textFont('Georgia');
    fill('green');
    text('! Welcome to the Classic Hockey !', 5, 200);

    textSize(15);
    textFont('Georgia');
    fill('green');
    text('Try to defeat the computer in this game ', 7, 380);

    textSize(16);
    textFont('Georgia');
    fill('green');
    text('Click on the board to start the game', 10, 400);
  }

  if(gameState === 2){
    textSize(20);
    textFont('Ayuthaya');
    fill('darkBlue');
    text(playerScore, 20, height/2 - 10);

    textSize(20);
    textFont('Ayuthaya');
    fill('darkBlue');
    text(opponentScore, 200, height/2 - 10);

    if(jockeyBall.isTouching(playerGoal)){
      opponentScore = opponentScore + 1;
    }

    if(jockeyBall.isTouching(opponentGoal)){
      playerScore = playerScore + 1;
    }

    if(opponentScore === 1 || playerScore === 25){
      gameState = 3;
    }
  }

  if(gameState === 3){

    textSize(20);
    textFont('Georgia');
    fill('darkBlue');
    text('Thanks for playing !!', width/2 - 90, height/2 - 100);

    textSize(20);
    textFont('Georgia');
    fill('darkBlue');
    text('-: Your score :-', width/2 - 70, height/2 + 200);

    textSize(20);
    textFont('Georgia');
    fill('darkBlue');
    text(playerScore, width/2, height/2 + 250);

    if(opponentScore === 1 || playerScore === 2 || playerScore === 3|| playerScore === 4 || playerScore === 5){
      textSize(19);
      textFont('Georgia');
      fill('darkBlue');
      text('See, I told you it is very difficult', 5, 360);

      textSize(20);
      textFont('Georgia');
      fill('darkBlue');
      text('to beat the computer', 30, 400);
    }

    playerJockey.destroy();
    jockeyBall.destroy();
    opponentJockey.destroy();
  }


}
