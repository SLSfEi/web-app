const status_elem = document.getElementById("connection_status")
const period_elem = document.getElementById("update_period")
const draw_period_elem = document.getElementById("draw_period")
const driver_state_elem = document.getElementById("driver_state")

let is_connected = false;
let update_period = -1;
let draw_period = -1;
let last_update = Date.now();
let points_data = []

const set_connection_lost = (forced=false) =>{
    if(is_connected || forced){
        is_connected = false;
        status_elem.innerText = status_elem.textContent = "connection lost"
        status_elem.style.dolor = "white";
        status_elem.style.background = color_fail;
    }
}
const set_connection_timeout = (forced=false) =>{
    if(is_connected || forced){
        is_connected = false;
        status_elem.innerText = status_elem.textContent = "connection timeout"
        status_elem.style.color = "white";
        status_elem.style.background = color_fail;
    }
}
const set_connection_success = (forced=false) =>{
    if(is_connected == false || forced){
        is_connected = true;
        status_elem.innerText = status_elem.textContent = "connected"
        status_elem.style.color = "white";
        status_elem.style.background = color_success;
    }
}

// define event callbacks
var on_conn_close = set_connection_lost
var on_conn_update = (event) => {
    current_time = Date.now();
    update_period = (current_time - last_update); // in ms
    last_update = current_time;
    period_elem.innerText = period_elem.textContent = update_period;
    set_connection_success();
    points_data = JSON.parse(event.data)[0]["scan_data"];
    draw_points(points_data);
    draw_period = (Date.now() - last_update);
    draw_period_elem.innerText = draw_period_elem.textContent = draw_period;
    
}
var on_conn_timeout = set_connection_timeout

// initiate websocket handler
var ws_url = "ws://" + window.location.host + "/ws/ticks/";
var ticks = new WSHandler(ws_url);
ticks.set_onmessage(on_conn_update);
ticks.set_onclose(on_conn_close);
ticks.set_ontimeout(on_conn_timeout);
set_connection_timeout(true);

// check for markers parameters
if(localStorage["width-value"] !== undefined
    && localStorage["height-value"] !== undefined
    && localStorage["x-n-value"] !== undefined
    && localStorage["y-n-value"] !== undefined
){
    add_marker_from_parameters(Number(localStorage["width-value"]),
                                Number(localStorage["height-value"]),
                                Number(localStorage["x-n-value"]),
                                Number(localStorage["y-n-value"])
    )
}