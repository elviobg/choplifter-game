const game = {
  time: setInterval(loop, 30),
  actions: [],
  canFire: true,
};

const INPUTS = {
  up: 87,
  down: 83,
  fire: 68,
};

const LIMITS = {
  PLAYER: {
    TOP: 2,
    BOTTOM: 434,
  },
  ENEMY_HELICOPTER: {
    LEFT: 0,
    RIGHT: 694,
  },
  ENEMY_TRUCK: {
    LEFT: 0,
    RIGHT: 775,
  },
  SURVIVOR: {
    LEFT: 0,
    RIGHT: 906,
  },
};

const velocidade = 5;
let posicaoY;
var tempoDisparo = null;

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
  moveEnemyTruck();
  moveSurvivor();
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
  if (game.actions[INPUTS.up] && playerPositionTop > LIMITS.PLAYER.TOP) {
    $("#player").css("top", playerPositionTop - 10);
  } else if (
    game.actions[INPUTS.down] &&
    playerPositionTop <= LIMITS.PLAYER.BOTTOM
  ) {
    $("#player").css("top", playerPositionTop + 10);
  }
}

function playerFire() {
  if (game.actions[INPUTS.fire]) {
    fire();
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
  if (posicaoX <= LIMITS.ENEMY_HELICOPTER.LEFT) {
    createNewEnemyHelicopter();
    enemy.css("left", LIMITS.ENEMY_HELICOPTER.RIGHT);
    enemy.css("top", posicaoY);
  }
}

function moveEnemyTruck() {
  const posicaoX = parseInt($("#enemyTruck").css("left"));
  $("#enemyTruck").css("left", posicaoX - 3);
  if (posicaoX <= LIMITS.ENEMY_TRUCK.LEFT) {
    $("#enemyTruck").css("left", LIMITS.ENEMY_TRUCK.RIGHT);
  }
}

function moveSurvivor() {
  const posicaoX = parseInt($("#survivor").css("left"));
  $("#survivor").css("left", posicaoX + 1);

  if (posicaoX > LIMITS.SURVIVOR.RIGHT) {
    $("#survivor").css("left", LIMITS.SURVIVOR.LEFT);
  }
}

function fire() {
  if (game.canFire) {
    game.canFire = false;
    const topo = parseInt($("#player").css("top"));
    const posicaoX = parseInt($("#player").css("left"));
    const tiroX = posicaoX + 190;
    const topoTiro = topo + 42;
    $("#background").append("<div id='fire'></div");
    $("#fire").css("top", topoTiro);
    $("#fire").css("left", tiroX);
    tempoDisparo= window.setInterval(executaDisparo, 30);
  }
}

function executaDisparo() {
  const posicaoX = parseInt($("#fire").css("left"));
  $("#fire").css("left", posicaoX + 15);
  if (posicaoX > 900) {
    window.clearInterval(tempoDisparo);
    tempoDisparo = null;
    $("#fire").remove();
    game.canFire = true;
  }
}
