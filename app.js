//Server generated
const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);
const os = require('os-utils');


app.use(express.static('html'));

const cpuHistogram = [];
const memHistogram = [];

const histrogramLenght = 61;
const interval = 1000;

app.get('/', (req, res) => {
    res.send('<a href="http://localhost:3000/cpumonitor.html">Dynamic Monitor</a>');    
});

http.listen(3000, function() {

    console.log("Listen Port 3000")

    for(let i = 0; i < histrogramLenght; i++) {
        cpuHistogram[i] = [1,0];
        memHistogram[i] = [1,0];
    }

    setInterval(function() {
        
        // os.cpuUsage( callback )
        os.cpuUsage(function(value) {
            updateCpuhistogram(Math.round(value * 100));
            io.emit('cpu histogram', cpuHistogram);
        });
        
        const ram_total = os.totalmem();
        const ram_free = os.freemem();
        const ram_used = ram_total - ram_free;
        
        const memTotal = Math.round(ram_total / 1024 * 100) / 100
        updateMemhistogram(Math.round(ram_used / 1024 * 100) / 100);
        io.emit('mem histogram', memTotal, memHistogram);

    }, interval);
});

function updateCpuhistogram(cpuLoad) {
    if(cpuHistogram.length >= histrogramLenght) {
        cpuHistogram.shift();
    }

    cpuHistogram.push([0, cpuLoad]);

    for(let i=0; i < histrogramLenght; i++) {
        cpuHistogram[i][0] = i;
    }
}

function updateMemhistogram(memLoad) {
    if(memHistogram.length >= histrogramLenght) {
        memHistogram.shift();
    }

    memHistogram.push([0, memLoad]);

    for(let i=0; i < histrogramLenght; i++) {
        memHistogram[i][0] = i;
    }
}