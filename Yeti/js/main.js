const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
var rect = document.querySelector(".canva").getBoundingClientRect();

canvas.width  = Math.max(1, Math.min(900, rect.width));
canvas.height = Math.max(1, Math.min(600, rect.height));

//загрузка картиночек
var loseImg = new Image();
var emptyImg = new Image();
var winImg = new Image();
var penguinDeadImg = new Image();
var penguinAliveImg = new Image();
var bg = new Image();
var hero1pos = new Image();
var hero2pos = new Image();
var ball = new Image();
var targetImg = new Image();
var hero = new Image();
var herobg1 = new Image();
var herobg2 = new Image();
var bulletImg = new Image();

var penguinPos = penguinAliveImg;
var heroPos = hero1pos;
var result = emptyImg;

//объекты
var playerName = 'pasha';
var mouse = {
  x: 0,
  y: 0
}
var bullet ={
  speed: 5,
  x: 155,
  y: 430
}
var penguin ={
  x: 500,
  y: 110,
  width: 100,
  height: 100,
  speedY:2,
  speedX:3
};
var target = {
  xpos: 700,
  ypos: 300,
  width: 200,
  height: 200
}
loseImg.src = "img/lose.png";
emptyImg.src = "img/empty.png";
winImg.src = "img/goal.png";
bg.src = "img/bg.jpg";
targetImg.src = "img/target.png";
hero1pos.src = "img/hero1pos.png";
hero2pos.src = "img/hero2pos.png";
herobg1.src = "img/herobg1.png";
herobg2.src = "img/herobg2.png";
bulletImg.src = "img/bullet.png";
penguinAliveImg.src = "img/penguinAlive.png";
penguinDeadImg.src ="img/penguinDead.png"

window.onload = function(){
  render();
}

//рендер
function render(){
  context.drawImage(bg, 0, 0);
  context.drawImage(targetImg,target.xpos ,target.ypos,target.width,target.height);
  context.drawImage(bulletImg, bullet.x, bullet.y, 20, 20);
  context.drawImage(heroPos, 100, 390, 100,100);
  context.drawImage(penguinPos, penguin.x, penguin.y, penguin.width, penguin.height);
  context.drawImage(result,320,200,200,200);
}

//html элементы
buttonResult = document.getElementById("button3");
button2 = document.getElementById("button2");
button1 = document.getElementById("button1");
resetRecord = document.getElementById('button4');
score = document.getElementById('score');
records = document.getElementById('table');

button1.onclick = function(){
  startGame();
  setTimeout(penguinFall, 3000);
}

button2.onclick = function(){
location.reload();
}
buttonResult.onclick = function(){
  records.innerHTML = "Your record is: " + localStorage.getItem(playerName);
}
resetRecord.onclick = function(){
  localStorage.setItem(playerName, 0);
}

//основной цикл
function startGame() {
  render();
  requestAnimationFrame(startGame);
}
document.addEventListener('keydown', shot);
document.addEventListener('click', shot);

canvas.addEventListener('mousemove', checkMouse)

function checkMouse(e){
  mouse.x = e.pageX - this.offsetLeft
  mouse.y = e.pageY - this.offsetTop
}

function penguinFall(){
  let interval;
  interval = setInterval(function(){
    var count = 0;
    penguin.y += penguin.speedY;
    if (penguin.y === 500){
      penguin.y = 0;
    }
    if ((Math.abs(penguin.x + 10 - bullet.x - 5) < 50) && Math.abs(penguin.y - bullet.y)<50) {
      penguinPos = penguinDeadImg;
      penguin.x += 12;
      penguin.speedY = 0;
  }
    if (penguin.x == 512 && penguin.y > 300){
      var shotScore = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
      score.innerHTML = 'Score ' + shotScore;
      if (shotScore > localStorage.getItem(playerName)){
        localStorage.setItem(playerName, shotScore);
      }
    }
    if (penguin.x == 512 && penguin.y < 300){
      var shotScore = 0;
      result = loseImg;
      score.innerHTML = 'Score ' + shotScore;
    }
  }, 5)
}
function shot(){
  let interval;
  document.removeEventListener("keydown", shot);
  interval = setInterval(function() {
    heroPos = hero2pos;
    bullet.x += bullet.speed
    bullet.y += (bullet.speed * mouse.y - 2300) / mouse.x
    if (bullet.x === target.xpos){
      document.addEventListener('keydown', shot);
      clearInterval(interval)
      bullet.x = 155
      bullet.y = 430
      heroPos = hero1pos;
    }
  }, 5);
}










