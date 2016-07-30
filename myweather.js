// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license.
'use strict';
// Define the objects you will be working with
var five = require ("johnny-five");
var Shield = require("j5-sparkfun-weather-shield")(five);
//var device = require('azure-iot-device');

// Add the following definition for the Particle plugin for Johnny-Five
var Particle = require("particle-io");

var board = new five.Board({
  io: new Particle({
    token: "4454731742f262fcb07e21106219cf024c7f5743",
    deviceId: "350044000a47353138383138"
  })
});

// The board.on() executes the anonymous function when the 
// board reports back that it is initialized and ready.
board.on("ready", function() {
    console.log("Board connected...");

    var weather = new Shield({
                variant: "PHOTON",  // or ARDUINO
                freq: 3000,         // Set the callback frequency to 1-second
                elevation: 500      // Go to http://www.WhatIsMyElevation.com to get your current elevation
            });
            
            // The weather.on("data", callback) function invokes the anonymous callback function 
            // whenever the data from the sensor changes (no faster than every 25ms). The anonymous 
            // function is scoped to the object (e.g. this == the instance of Weather class object). 
         // setTimeout( 
           weather.on("data", function () {
                console.log("Data...");
                var led = new five.Led("D1");
                var wetdata = {
                    deviceId: board.io.deviceId,
                    location: 'Gabby Room',
                    // celsius & fahrenheit are averages taken from both sensors on the shield
                    celsius: this.celsius,
                    fahrenheit: this.fahrenheit,
                    relativeHumidity: this.relativeHumidity,
                    pressure: this.pressure,
                    feet: this.feet,
                    meters: this.meters
                };

               console.log(wetdata);
               if(wetdata.relativeHumidity > 40)
                  led.blink();
})//, 10000);
       
});
    
