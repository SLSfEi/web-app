const status_elem = document.getElementById("connection_status")
const period_elem = document.getElementById("update_period")
let update_period = -1;
let last_update = new Date();

// define event callbacks
var on_conn_close = (event) => {
    status_elem.innerText = status_elem.textContent = "connection lost"
    status_elem.style.background = color_fail;
}
var on_conn_update = (event) => {
    current_time = new Date()
    update_period = (current_time - last_update); // in ms
    last_update = current_time;
    // console.log(update_period)
    period_elem.innerText = period_elem.textContent = update_period;

    status_elem.innerText = status_elem.textContent = "connected"
    status_elem.style.background = color_success;
    const points_data = JSON.parse(event.data)[0]["scan_data"];
    // draw_points(points_data);
}
var on_conn_timeout = (event) => {
    status_elem.innerText = status_elem.textContent = "connection timeout"
    status_elem.style.background = color_fail;
}

// initiate websocket handler
var ws_url = "ws://" + window.location.host + "/ws/ticks/";
var ticks = new WSHandler(ws_url);
ticks.set_onmessage(on_conn_update);
ticks.set_onclose(on_conn_close);
ticks.set_ontimeout(on_conn_timeout);

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