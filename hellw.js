var five = require("johnny-five");
var Particle = require("particle-io");
var board = new five.Board({
  io: new Particle({
    token: "4454731742f262fcb07e21106219cf024c7f5743",
    deviceId: "350044000a47353138383138"
  })
});

board.on("ready", function() {
  console.log("Device Ready..");
  var led = new five.Led("D0");
  led.blink();
});