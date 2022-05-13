const game = {
  time: setInterval(loop, 30),
  actions: [],
};

const INPUTS = {
  up: 87,
  down: 83,
  fire: 68,
};

const LIMITS = {
    TOP: 2,
    BOTTOM: 434,
    RIGHT: 694,
}

const velocidade = 5;
let posicaoY;

function start() {
  $("#start").hide();
  $("#background").append("<div id='player' class='playerAnimation'></div>");
  $("#background").append("<div id='enemyTruck'></div>");
  $("#background").append(
    "<div id='enemyHelicopter' class='playerAnimation'></div>"
  );
  $("#background").append(
    "<div id='survivor' class='survivorAnimation'></div>"
  );
  createNewEnemyHelicopter();
}

function loop() {
  updateScenary();
  movePLayer();
  playerFire();
  moveEnemyHelicopter();
}

function updateScenary() {
  const esquerda = parseInt($("#background").css("background-position"));
  $("#background").css("background-position", esquerda - 1);
}

$(document).keydown(function (e) {
  game.actions[e.which] = true;
});

$(document).keyup(function (e) {
  game.actions[e.which] = false;
});

function movePLayer() {
  const playerPositionTop = parseInt($("#player").css("top"));
  if (game.actions[INPUTS.up] && playerPositionTop > LIMITS.TOP) {
    $("#player").css("top", playerPositionTop - 10);
  } else if (game.actions[INPUTS.down] && playerPositionTop <= LIMITS.BOTTOM) {
    $("#player").css("top", playerPositionTop + 10);
  }
}

function playerFire() {
  if (game.actions[INPUTS.fire]) {
  }
}

function createNewEnemyHelicopter() {
  posicaoY = parseInt(Math.random() * 334);
}

function moveEnemyHelicopter() {
  const enemy = $("#enemyHelicopter");
  const posicaoX = parseInt(enemy.css("left"));
  enemy.css("left", posicaoX - velocidade);
  enemy.css("top", posicaoY);
  if (posicaoX <= 0) {
    createNewEnemyHelicopter();
    enemy.css("left", LIMITS.RIGHT);
    enemy.css("top", posicaoY);
  }
}
