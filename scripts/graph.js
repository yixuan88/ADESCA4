var datetime;
var intervalArr = [];

$(document).on('click', 'a', function () {
    var dropdownid = $(this).parent().attr("id");
    var id = dropdownid.substring(8);
    var queue_id = this.id;
    var exists = false;
    var chart;
    
    console.log("id " + id + " is showing queueid: " + queue_id);
    
    var loading = document.getElementById("tracking_" + id).getElementsByClassName("lds-ripple");
    var error = document.getElementById("tracking_" + id).getElementsByClassName("sa");
    
    document.getElementById("tracking_"+id).getElementsByClassName("queueIdTxt")[0].value = queue_id;
    document.getElementById("tracking_"+id).getElementsByClassName("row2")[0].style.display = "flex";
    
    iconAnimation("visible", loading);

    Chart.helpers.each(Chart.instances, function(instance){
        if(instance.chart.canvas.id == 'myChart' + id){
            exists = true;
            chart = instance.chart;
            clearInterval(intervalArr[id]);
        }
    })
    
    if(exists == false){
        chart = new Chart(document.getElementById('myChart' + id).getContext('2d'), {
            type: 'line',
            data: {
                datasets: [{
                    label: "Arrival Rate",
                    borderColor: '#760b14',
                    fill: false,
                }]
            },
            options: {
                animation: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0
                        }
                    }],
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'minute',
                        },
                    }],
                },
                tooltips: {
                    enabled: false,
                },
                elements: {
                    point: {
                        radius: 0
                    }
                },
            }
        });
    }
    var chartObj = {
        loading : loading,
        error : error,
        chart : chart
    }
    intervalArr[id] = setInterval(function () {
        iconAnimation("visible", loading);
        fetchArrivalRate(queue_id, chartObj);
    }, 3000);
});

function fetchArrivalRate(queue_id, chartObj) {
    datetime = moment().subtract(moment.duration("00:03:00")).format().replace('+', '%2B');
    fetch(`https://ades-2b01.herokuapp.com/company/arrival_rate?queue_id=${queue_id}&from=${datetime}&duration=3`)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            iconAnimation("hidden", chartObj.error);
            updateGraph(json, chartObj);
        })
        .catch(function (err) {
            iconAnimation("visible", chartObj.error);
            console.log("Unknown Err : " + err);
        })
}

function iconAnimation(x, element) {
    for (let i = 0; i < element.length; i++) {
        element[i].style.visibility = x;
    }
}

function updateGraph(chartdata, chartObj) {
    iconAnimation("hidden", chartObj.loading);
    chartObj.chart.data.labels = chartdata.map(x => { return moment.unix(x.timestamp).format() });
    chartObj.chart.data.datasets[0].data = chartdata.map(x => { return x.count });
    chartObj.chart.update();
}

function clearGraph(tracking_id){
    Chart.helpers.each(Chart.instances, function(instance){
        if(instance.chart.canvas.id == 'myChart' + tracking_id){
            instance.destroy();
            clearInterval(intervalArr[tracking_id]);
        }
    })
}