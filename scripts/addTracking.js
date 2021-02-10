let id = 1;


function addTracking() {
    let container = document.getElementsByClassName("container")[0];
    let tracking_container = container.firstElementChild;
    let duplicate = tracking_container.cloneNode(true);
    
    let tracking_id = "tracking_" + id;
    duplicate.style.display = "flex";
    duplicate.setAttribute("id", tracking_id);
    duplicate.getElementsByTagName('input')[0].id = "companyIdTxt"+ id
    duplicate.getElementsByTagName('button')[0].id = "button"+ id
    duplicate.getElementsByClassName('dropdown-content')[0].id = "dropdown" + id
    duplicate.getElementsByClassName('loader')[0].id = "loader" + id
    duplicate.getElementsByTagName('input')[2].id = "hide"+ id
    duplicate.getElementsByClassName('myChart')[0].id = "myChart" + id
    duplicate.getElementsByClassName('error')[0].id = "error" + id
    
    let shown_container = document.getElementsByClassName("shown_container")[0]
    shown_container.insertBefore(duplicate, shown_container.lastElementChild);
    id++;
}

