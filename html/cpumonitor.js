google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(DynamicCPU);

var cpu_charloaded = false;
var cpu_histogram = [];

function DynamicCPU() {

    var statusCPU = `${cpu_histogram[60]}`;
    statusCPU = statusCPU.replace(/60,/g,"");

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', `${statusCPU}% CPU`);

    data.addRows(cpu_histogram);

    var options = {
        hAxis: {
            title: 'Status Dynamic CPU'
        },
        vAxis: {
            title: `CPU Load ${statusCPU} %`,
            viewWindow: {
                min: 0,
                max: 100,
            }
        }
    };

    var chart = new google.visualization.LineChart(document.getElementById('cpu_div'));

    chart.draw(data, options);

    cpu_charloaded = true;

}

var socket = io();
socket.on('cpu histogram', function(cpuHistogram) {
    // console.log(cpuHistogram);
    cpu_histogram = cpuHistogram;
    if(cpu_charloaded){
        DynamicCPU();
    }
});