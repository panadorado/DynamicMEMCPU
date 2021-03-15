google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(DynamicMEM);

var mem_charloaded = false;
var mem_total = 0.0;
var mem_histogram = [];

function DynamicMEM() {

    var statusMem = `${mem_histogram[60]}`;
    statusMem = statusMem.replace(/60,/g,"");

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', `Used ${statusMem} MB MEM`);

    data.addRows(mem_histogram);

    var options = {
        hAxis: {
            title: 'Memory Dynamic Status'
        },
        vAxis: {
            title: `MEMORY USED`,
            viewWindow: {
                min: 0,
                max: parseInt(mem_total + 1),
            }
        }
    };

    var chart = new google.visualization.LineChart(document.getElementById('mem_div'));

    chart.draw(data, options);

    mem_charloaded = true;

}

var socket = io();
socket.on('mem histogram', function(memTotal, memHistogram) {
    mem_total = memTotal;
    mem_histogram = memHistogram;
    if(mem_charloaded){
        DynamicMEM();
    }
});