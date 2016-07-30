var keypress = require("keypress");
// var Spark = require("spark-io");
var Spark = require("../");
var five = require("johnny-five");
var Sumobot = require("sumobot")(five);

keypress(process.stdin);

var board = new five.Board({
  io: new Spark({
    token: process.env.SPARK_TOKEN,
    deviceId: process.env.SPARK_DEVICE_2
  })
});

board.on("ready", function() {

  console.log("Welcome to Sumobot Jr: Light Bot!");

  var bot = new Sumobot({
    left: "D0",
    right: "D1",
    speed: 0.50
  });

  var light = new five.Sensor("A0");
  var isQuitting = false;

  light.on("change", function() {
    if (isQuitting || this.value === null) {
      return;
    }

    if (this.value < 512) {
      bot.fwd();
    } else {
      bot.rev();
    }
  });

  // Ensure the bot is stopped
  bot.stop();
});
