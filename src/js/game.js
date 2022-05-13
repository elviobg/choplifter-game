const game = {
  time: setInterval(loop, 30),
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
}

function loop() {
  updateScenary();
}

function updateScenary() {
  const esquerda = parseInt($("#background").css("background-position"));
  $("#background").css("background-position", esquerda - 1);
}


