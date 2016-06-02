var wpi = require('wiring-pi');
var pin1 = 7;
var pin2 = 0;
var timeOut = 1000;
wpi.setup('wpi');
wpi.pinMode(pin1, wpi.OUTPUT);
wpi.pinMode(pin2, wpi.OUTPUT);
var isLedOn = 0;
setInterval(function(){
	isLedOn = +!isLedOn;
	wpi.digitalWrite(pin1, isLedOn);
	wpi.digitalWrite(pin2, isLedOn==0 ? 1 : 0);
}, timeOut);

function cleanUp(pin1, pin2){
  wpi.pinMode(pin1, wpi.INPUT);
  wpi.pinMode(pin2, wpi.INPUT);
}

// so that the program won't close immediately
process.stdin.resume();

function exitHandler(opts, err){
  if(opts.cleanup) cleanUp(pin1, pin2);
  if(opts.exit) process.exit();
}

// do something when the node app is closing
process.on('exit', exitHandler.bind(null, {cleanup: true}));
// catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit: true}));
