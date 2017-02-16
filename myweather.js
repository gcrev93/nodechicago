// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license.

// This is my own personal project using the weather shield. I created a humidity alert!
// If the humidity levels are more than 40% my LEDs will flash and alert me not to wear my hear down
// Because hair and humidity do not match :)


'use strict';
// Define the objects you will be working with
var five = require ("johnny-five");
var Shield = require("j5-sparkfun-weather-shield")(five);


// Add the following definition for the Particle plugin for Johnny-Five
var Particle = require("particle-io");

var board = new five.Board({
  io: new Particle({
    token: "",
    deviceId: ""
  })
});


board.on("ready", function() {
    console.log("Board connected...");

    var weather = new Shield({
                variant: "PHOTON",  // or ARDUINO
                freq: 3000,         // Set the callback frequency to 1-second
                elevation: 500      // Go to http://www.WhatIsMyElevation.com to get your current elevation
            });
            
            
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
    
