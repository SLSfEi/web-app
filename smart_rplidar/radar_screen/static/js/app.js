//========== init ==========\\
const app_sides_length = 1000;
const app_sides_ratio = 1;
const max_dist = 6000;
const additional_dist = 1000;

const color_success = "#5c9665"
const color_fail = "#ff004f"
const color_hover = "#ce7e00"
const color_normal = "#000000"
const color_hilight = "#3e6dbf"
const color_background = "#ffffff"

const app = new PIXI.Application(
    {
        width: app_sides_length,
        height: app_sides_length,
        transparent: false,
        background: color_background
    });
const canvas_host = document.getElementById("canvas-host");
canvas_host.appendChild(app.view);

function resize() {
    let host_width = window.innerWidth;
    let host_height = window.innerHeight;
    
    if(host_width > host_height){
        host_height = host_height * 0.85;
    }
    
    if (host_width / host_height >= app_sides_ratio) {
        var w = host_height * app_sides_ratio;
        var h = host_height;
    } else {
        var w = host_width;
        var h = host_width / app_sides_ratio;
    }
    app.renderer.view.style.width = w + 'px';
    app.renderer.view.style.height = h + 'px';
}
resize()
window.onresize = resize;

const scale_point = (x,y) => {
    const new_x = ((x / ((max_dist+additional_dist) * 2)) * app.screen.width) + (app.screen.width / 2);
    const new_y = ((y / ((max_dist+additional_dist) * 2)) * app.screen.height) + (app.screen.height / 2);
    return [new_x,new_y]
};

function get_random_sub_array(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, min = i - size, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}