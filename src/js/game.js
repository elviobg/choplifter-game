const game = {
  time: setInterval(loop, 30),
  actions: [],
};

const INPUTS = {
  up: 87,
  down: 83,
  fire: 68,
};

const TOP = 2;
const BOTTOM = 434;

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
}

function loop() {
  updateScenary();
  movePLayer();
  playerFire();
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
  if (game.actions[INPUTS.up] && playerPositionTop > TOP) {
    $("#player").css("top", playerPositionTop - 10);
  } else if (game.actions[INPUTS.down] && playerPositionTop <= BOTTOM) {
    $("#player").css("top", playerPositionTop + 10);
  }
}

function playerFire() {
  if (game.actions[INPUTS.fire]) {
  }
}
