const status_elem = document.getElementById("connection_status")
const period_elem = document.getElementById("update_period")
const draw_period_elem = document.getElementById("draw_period")
const driver_state_elem = document.getElementById("driver_state")
const driver_reset_elem = document.getElementById("driver_reset")
const driver_terminate_elem = document.getElementById("driver_terminate")

let is_connected = false;
let update_period = -1;
let draw_period = -1;
let last_update = Date.now();

let incomming_data = undefined;

const post_driver_command = async (command) => {
    try{
        await fetch("/api/v1/driver", {
            method: "post",
            body: JSON.stringify({"command": command}),
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch(err) {
        console.error(`Error: ${err}`);
    }
}

const poll_driver_status = async () => {
    try{
        fetch("api/v1/driver")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let status = data["driver_status"]
            let exist = data["driver_exist"]
            if(exist){
                driver_state_elem.parentElement.style.display = "flex";
                driver_reset_elem.style.display = "unset";
                driver_terminate_elem.style.display = "unset";
                if(status){
                    driver_state_elem.innerText = driver_state_elem.textContent = "RUNNING";
                    driver_state_elem.style.color = color_success;
                } else {
                    driver_state_elem.innerText = driver_state_elem.textContent = "STOPPED";
                    driver_state_elem.style.color = color_fail;
                }
            } else {
                driver_state_elem.parentElement.style.display = "none";
                driver_reset_elem.style.display = "none";
                driver_terminate_elem.style.display = "none";
            }
            
        })
        
    } catch(err) {
        console.error(`Error: ${err}`);
    }
  }
setInterval(poll_driver_status, 1000)

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
    incomming_data = JSON.parse(event.data)[0];

    if(incomming_data["scan_data"] !== undefined){
        // calculate update_period
        current_time = Date.now();
        update_period = (current_time - last_update); // in ms
        last_update = current_time;

        // display update_period
        period_elem.innerText = period_elem.textContent = update_period;

        // display successful connection
        set_connection_success();

        // draw scan points
        draw_points(incomming_data["scan_data"]);

        // calculate draw_period
        draw_period = (Date.now() - last_update);

        // display draw_period
        draw_period_elem.innerText = draw_period_elem.textContent = draw_period;
    }
    
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