const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var player, playerBase, playerArcher, arrow;
var arrows = [];


function preload() {
  backgroundImg = loadImage("./assets/background.png");
  baseImage = loadImage("./assets/base.png");
  playerImage = loadImage("./assets/player.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);

  var options = {
    isStatic: true
  };

  playerBase = Bodies.rectangle(200, 350, 180, 150, options);
  World.add(world, playerBase);

  player = Bodies.rectangle(250, playerBase.position.y - 160, 50, 180, options);
  World.add(world,player)

  playerArcher = new PlayerArcher(
    320,
    playerBase.position.y - 100,
    120,
    120
  );

  arrow = new PlayerArrow(
    320,
    playerBase.position.y - 100,
    120,
    20
  );
}

function draw() {
  background(backgroundImg);

  Engine.update(engine);
  image(baseImage,playerBase.position.x,playerBase.position.y,180,150)
  image(playerImage,player.position.x,player.position.y,50,180)


  playerArcher.display();
  arrow.display();

  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("EPIC ARCHERY", width / 2, 100);
}

function keyPressed() {
  if(keyCode === 32) {
    arrows.push(arrow);
  }
}

function keyReleased() {
  if(keyCode === 32) {
    arrows[arrows.length-1].shoot(playerArcher.body.angle);
  }
}