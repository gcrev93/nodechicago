var five = require("johnny-five");
var Particle = require("particle-io");

var board = new five.Board({
  io: new Particle({
    token: '[AccessToken]',
    deviceName: '[DeviceName]'
  })
});

board.on("ready", function() {
  console.log("Device Ready..");
  var led = new five.Led("D7");
  led.blink();
});
