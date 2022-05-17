const game = {
  time: setInterval(loop, 30),
  actions: [],
  canFire: true,
  fireSpeed: null,
};

const INPUTS = {
  up: 87,
  down: 83,
  fire: 68,
};

const CONFIG = {
  PLAYER: {
    TOP: 2,
    BOTTOM: 434,
    SPEED: 10,
  },
  ENEMY_HELICOPTER: {
    LEFT: 0,
    RIGHT: 694,
    SPEED: 5,
    POSICAO_Y: 0,
  },
  ENEMY_TRUCK: {
    LEFT: 0,
    RIGHT: 775,
    SPEED: 3,
  },
  SURVIVOR: {
    LEFT: 0,
    RIGHT: 906,
    SPEED: 1,
  },
};

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
  checkCollisions();
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
  if (game.actions[INPUTS.up] && playerPositionTop > CONFIG.PLAYER.TOP) {
    $("#player").css("top", playerPositionTop - CONFIG.PLAYER.SPEED);
  } else if (
    game.actions[INPUTS.down] &&
    playerPositionTop <= CONFIG.PLAYER.BOTTOM
  ) {
    $("#player").css("top", playerPositionTop + CONFIG.PLAYER.SPEED);
  }
}

function playerFire() {
  if (game.actions[INPUTS.fire]) {
    fire();
  }
}

function clearFire() {
  window.clearInterval(game.fireSpeed);
  game.fireSpeed = null;
  $("#fire").remove();
  game.canFire = true;
}

function createNewEnemyHelicopter() {
  CONFIG.ENEMY_HELICOPTER.POSICAO_Y = parseInt(Math.random() * 334);
  const enemy = $("#enemyHelicopter");
  enemy.css("left", CONFIG.ENEMY_HELICOPTER.RIGHT);
  enemy.css("top", CONFIG.ENEMY_HELICOPTER.POSICAO_Y);
}

function createNewEnemytruck() {
  const enemy = $("#enemyTruck");
  enemy.css("left", CONFIG.ENEMY_TRUCK.RIGHT);
}

function moveEnemyHelicopter() {
  const enemy = $("#enemyHelicopter");
  const posicaoX = parseInt(enemy.css("left"));
  enemy.css("left", posicaoX - CONFIG.ENEMY_HELICOPTER.SPEED);
  enemy.css("top", CONFIG.ENEMY_HELICOPTER.POSICAO_Y);
  if (posicaoX <= CONFIG.ENEMY_HELICOPTER.LEFT) {
    createNewEnemyHelicopter();
  }
}

function moveEnemyTruck() {
  const posicaoX = parseInt($("#enemyTruck").css("left"));
  $("#enemyTruck").css("left", posicaoX - CONFIG.ENEMY_TRUCK.SPEED);
  if (posicaoX <= CONFIG.ENEMY_TRUCK.LEFT) {
    createNewEnemytruck();
  }
}

function moveSurvivor() {
  const posicaoX = parseInt($("#survivor").css("left"));
  $("#survivor").css("left", posicaoX + CONFIG.SURVIVOR.SPEED);

  if (posicaoX > CONFIG.SURVIVOR.RIGHT) {
    $("#survivor").css("left", CONFIG.SURVIVOR.LEFT);
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
    game.fireSpeed = window.setInterval(executaDisparo, 30);
  }
}

function executaDisparo() {
  const posicaoX = parseInt($("#fire").css("left"));
  $("#fire").css("left", posicaoX + 15);
  if (posicaoX > 900) {
    clearFire();
  }
}

function checkCollisions() {
  const collisionHelicopter =
    $("#player").collision($("#enemyHelicopter")).length > 0;
  const collisionTruck = $("#player").collision($("#enemyTruck")).length > 0;
  const fireCollisionHelicopter =
    $("#fire").collision($("#enemyHelicopter")).length > 0;
  const fireCollisionTruck = $("#fire").collision($("#enemyTruck")).length > 0;
  const survivorCollision =
    $("#survivor").collision($("#enemyTruck")).length > 0;

  if (collisionHelicopter || collisionTruck) {
    explosion(
      parseInt($("#player").css("left")) + 180,
      parseInt($("#player").css("top"))
    );
  }

  if (fireCollisionHelicopter) {
    explosion(
      parseInt($("#enemyHelicopter").css("left")),
      parseInt($("#enemyHelicopter").css("top"))
    );
  } else if (fireCollisionTruck) {
    explosion(
      parseInt($("#enemyTruck").css("left")),
      parseInt($("#enemyTruck").css("top"))
    );
  }

  if (collisionHelicopter || fireCollisionHelicopter) {
    createNewEnemyHelicopter();
    clearFire();
  } else if (collisionTruck || fireCollisionTruck) {
    createNewEnemytruck();
    clearFire();
  }

  if (survivorCollision) {
    survivorDeath(
      parseInt($("#survivor").css("left")),
      parseInt($("#survivor").css("top"))
    );
    let recreateSurvivor = window.setInterval(recreate, 6000);

    function recreate() {
      window.clearInterval(recreateSurvivor);
      recreateSurvivor = null;
      $("#background").append("<div id='survivor' class='survivorAnimation'></div>");
    }
  }
}

function explosion(x, y) {
  $("#background").append("<div id='explosion'></div");
  $("#explosion").css("background-image", "url(assets/imgs/explosion.png)");
  const div = $("#explosion");

  div.css("top", y);
  div.css("left", x);
  div.animate({ width: 200, opacity: 0 }, "slow");

  let expireTime = window.setInterval(removeExplosion, 1500);

  function removeExplosion() {
    div.remove();
    window.clearInterval(expireTime);
    expireTime = null;
  }
}

function survivorDeath(x, y) {
  $("#background").append(
    "<div id='survivor_death' class='survivorDeathAnimation'></div"
  );
  $("#survivor_death").css(
    "background-image",
    "url(assets/imgs/survivor_death.png)"
  );
  const div = $("#survivor_death");

  div.css("top", y);
  div.css("left", x);
  $("#survivor").remove();

  var expireTime = window.setInterval(removeDeath, 1500);

  function removeDeath() {
    div.remove();
    window.clearInterval(expireTime);
    expireTime = null;
  }
}
