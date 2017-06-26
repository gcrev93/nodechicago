var five = require("johnny-five");
var Particle = require("particle-io");
var board = new five.Board({
  io: new Particle({
    token: "",
    deviceId: ""
  })
});

board.on("ready", function() {
  console.log("Device Ready..");
  var led = new five.Led("D0");
  led.blink();
});
