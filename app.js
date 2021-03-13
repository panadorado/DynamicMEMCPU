//Server generated
var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var os = require('os-utils');


app.use(express.static('html'));

var cpuHistogram = [];
var histrogramLenght = 61;
var interval = 1000;

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

http.listen(3000, function() {

    console.log("Listen Port 3000")

    for(var i = 0; i < histrogramLenght; i++) {
        cpuHistogram[i] = [1,0];
    }

    setInterval(function() {
        
        os.cpuUsage(function(value) {
            updateCpuhistogram(Math.round(value * 100));
            io.emit('cpu histogram', cpuHistogram)
        });

    }, interval);
});

function updateCpuhistogram(cpuLoad) {
    if(cpuHistogram.length >= histrogramLenght) {
        cpuHistogram.shift();
    }

    cpuHistogram.push([0, cpuLoad]);

    for(var i=0; i < histrogramLenght; i++) {
        cpuHistogram[i][0] = i;
    }
}