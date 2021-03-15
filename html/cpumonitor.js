google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(DynamicCPU);

var cpu_charloaded = false;
var cpu_histogram = [];

function DynamicCPU() {

    /*
    * Ở đây nó sẽ chạy 1 mảng chứa 61 phần tử và từ [0,n] - [60,n]
    * mình đưa về string sau đó xóa 60 và dấu phẩy đi lấy giá trị % CPU thôi :))
    */
    var statusCPU = `${cpu_histogram[60]}`;
    statusCPU = statusCPU.replace(/60,/g,"");

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', `${statusCPU}% CPU`);

    data.addRows(cpu_histogram); // 

    var options = {
        hAxis: {
            title: 'CPU Dynamic Status'
        },
        vAxis: {
            title: `CPU LOAD`,
            viewWindow: {
                // min vs max của Y 
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
    cpu_histogram = cpuHistogram;
    if(cpu_charloaded){
        DynamicCPU();
    }
});