// ********************************************
// KSLHacks 06/30/2017
// Chicago International Nodebots
// ********************************************

// bring in required libraries and packages
require('dotenv').config()
var five = require('johnny-five')
var Particle = require('particle-io')

// set up and connect to the particle board
var board = new five.Board({
  io: new Particle({
    // Token and Device ID can be found on particle.io IDE
    // Particle Token: Settings -> Access Token
    // Particle Device ID: Devices -> Device ID
    token: process.env.PARTICLE_TOKEN,
    deviceId: process.env.PARTICLE_DEVICE_ID
  })
})

// run code on the particle
// See for more information: https://github.com/rwaldron/particle-io
board.on('ready', function () {
  console.log('Setting pins..')
  this.pinMode('D1', this.MODES.INPUT)
  this.pinMode('D0', this.MODES.OUTPUT)

  console.log('Device Ready..')
  console.log('Reading Digital Pin D1..')

  // Log all the readings for D1
  this.digitalRead('D1', function (data) {
    console.log('D1 value: ' + data)
    if (data === 1) {
      console.log('Buzzer.. ON')
      this.digitalWrite('D0', 1)
    }
    if (data === 0) {
      console.log('Buzzer.. OFF')
      this.digitalWrite('D0', 0)
    }
  })
})
