function getQueues(data, id, dropdown) {
    document.getElementById("dropdown" + id).innerHTML = "";
    for (var i = 0; i < data.length; i++) {
        if (document.getElementById('hide' + id).checked) {
            if (data[i].is_active == 1) {
                $(dropdown).append(`<a id="${data[i].queue_id}">${data[i].queue_id}</a>`);
            }
        }
        else {
            console.log(data.length)
            if (data[i].is_active == 1) {
                $(dropdown).append(`<a id="${data[i].queue_id}">${data[i].queue_id}</a>`);
            } else {
                $(dropdown).append(`<p><s>${data[i].queue_id}</s></p>`);
            }
        }
    }
    document.getElementById("loader" + id).style.visibility = "hidden";
}

$(document).on('click', 'button[name= "search"]', function () {
    const host = "https://ades-2b01.herokuapp.com";
    var id = this.id.substring(6);

    var graph = document.getElementsByClassName('myChart')
    for(let i = 0; i<graph.length; i++){
        if(graph[i].id == 'myChart' + id){
            clearGraph(id);
            var parent = graph[i].parentNode.parentNode;
            parent.style.display = "none";
        }
    }

    document.getElementById("loader" + id).style.visibility = "visible";
    var dropdown = "#dropdown" + id;
    var error = "#error" + id;
    var company_id = document.getElementById("companyIdTxt" + id).value;
    const myNode = document.getElementById("dropdown" + id);
    const errordiv = document.getElementById("error" + id);
    errordiv.innerHTML = '';
    myNode.innerHTML = '';
    $.ajax({
        url: host + '/company/queue',
        data: {
            "company_id": company_id
        },
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (!$.trim(data)) {
                $(error).append(`<p style="margin-left: 20px">Unknown Company ID</p>`);
                document.getElementById("loader" + id).style.visibility = "hidden";
            } else {
                console.log('ajax success', data);
                getQueues(data, id, dropdown);
                document.getElementById('hide' + id).addEventListener("click", function () { getQueues(data, id, dropdown) });
            }
        },
        error: function (xhr) {
            document.getElementById("loader" + id).style.visibility = "hidden";
            if (xhr.status == 400) {
                $(error).append(`<p style="margin-left: 10px">Invalid Company ID</p>`);
            }
            else if (xhr.status == 500) {
                $(error).append(`<p style="margin-left: 30px">Unable to establish connection</p>`);
            }
            else {
                $(error).append(`<p style="margin-left: 30px">Server Error</p>`);
            }
        }
    })

});