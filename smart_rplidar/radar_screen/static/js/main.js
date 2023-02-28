// define event callbacks
var on_conn_close = (event) => {
    //display.innerText = display.textContent = "connection lost"
}
var on_conn_update = (event) => {
    const points_data = JSON.parse(event.data)[0]["scan_data"];
    draw_points(points_data);
}
var on_conn_timeout = (event) => {
    //display.innerText = display.textContent = "connection timeout"
}

// initiate websocket handler
var ws_url = "ws://" + window.location.host + "/ws/ticks/";
var ticks = new WSHandler(ws_url);
ticks.set_onmessage(on_conn_update);
ticks.set_onclose(on_conn_close);
ticks.set_ontimeout(on_conn_timeout);

add_test_markers()
draw_markers()