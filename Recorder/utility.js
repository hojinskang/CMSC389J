"use strict";

var color = "red";
var sideLength = 5;
var xCoor = new Array;
var yCoor = new Array;
var colorCoor = new Array;
var timeCoor = new Array;
var record = 0;

main();

function main() {
  document.onmousemove = processMousePosition;
  document.onkeypress = changeColor;
}

function processMousePosition(evt) {
  draw(evt.pageX, evt.pageY);
}

function draw(xPos, yPos) {
  var context = document.getElementById("canvas").getContext("2d");

  if (record == 1) {
    xCoor.push(xPos);
    yCoor.push(yPos);
    colorCoor.push(color);
    var d = new Date();
    timeCoor.push(d.getTime());

    // store drawing
    localStorage.setItem("xCoor", JSON.stringify(xCoor));
    localStorage.setItem("yCoor", JSON.stringify(yCoor));
    localStorage.setItem("colorCoor", JSON.stringify(colorCoor));
    localStorage.setItem("timeCoor", JSON.stringify(timeCoor));
  }

  context.fillStyle = color;
  context.fillRect(xPos, yPos, sideLength, sideLength);
}

function changeColor() {
  if (color === "red") {
    color = "blue";
  } else {
    color = "red";
  }
}

function startButton() {
  record = 1;
}

function stopButton() {
  record = 0;
}

function playButton() {
  var i = 0;

  function myLoop() {
    setTimeout(function() {
      color = colorCoor[i];
      draw(xCoor[i], yCoor[i]);
      i++;
      if (i < xCoor.length) {
        myLoop();
      }
    }, (timeCoor[i]-timeCoor[i-1]))
  }

  myLoop();
}

function clearButton() {
  var context = document.getElementById("canvas").getContext("2d");
  context.clearRect(0, 0, 500, 400);
}

function replayButton() {
  var j = 0;
  var xCr = JSON.parse(localStorage.getItem("xCoor"));
  var yCr = JSON.parse(localStorage.getItem("yCoor"));
  var cCr = JSON.parse(localStorage.getItem("colorCoor"));
  var tCr = JSON.parse(localStorage.getItem("timeCoor"));
  console.log(xCr);
  console.log(yCr);
  console.log(cCr);
  console.log(tCr);

  function myLoop2() {
    setTimeout(function() {
      color = cCr[j];
      draw(xCr[j], yCr[j]);
      j++;
      if (j < xCr.length) {
        myLoop2();
      }
    }, (tCr[j]-tCr[j-1]));
  }

  myLoop2();
}


function Utility (name, year, description) {
  this.name = name;
  this.year = year;
  this.description = description;
}

Utility.prototype = {
  constructor: Utility,
  getName: function() {
    return this.name;
  },
  getYear: function() {
    return this.year;
  },
  getDesc: function() {
    return this.description;
  },
  setDesc: function(desc) {
    this.description = desc;
  }
}

function Recorder(name, year, description) {
  Utility.call(this, name, year, description);
}

Recorder.prototype = Object.create(Utility.prototype);
Recorder.prototype.constructor = Recorder;
Recorder.prototype.startAnim = function() {}
Recorder.prototype.stopAnim = function() {}
Recorder.prototype.playAnim = function() {}
Recorder.prototype.clearScreen = function() {}
