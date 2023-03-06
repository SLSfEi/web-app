//========== init ==========\\
const app_sides_length = 1000;
const app_sides_ratio = 1;
const max_dist = 6000;
const additional_dist = 1000;

const color_success = "#009933"
const color_fail = "#ff004f"
const color_hover = "#ce7e00"
const color_normal = "#000000"
const color_hilight = "#3e6dbf"
const color_background = "#ffffff"

const canvas_host = document.getElementById("canvas-host");
const app = new PIXI.Application(
    {
        width: app_sides_length,
        height: app_sides_length,
        transparent: false,
        background: color_background,
        // resizeTo: canvas_host
    });
canvas_host.appendChild(app.view);

function resize() {
    const host_width = canvas_host.clientWidth;
    const host_height = canvas_host.clientHeight;
    
    if (host_width / host_height >= app_sides_ratio) {
        var w = host_height * app_sides_ratio;
        var h = host_height;
    } else {
        var w = host_width;
        var h = host_width / app_sides_ratio;
    }
    app.renderer.view.style.width = w + 'px';
    app.renderer.view.style.height = h + 'px';
    console.log(host_width, host_height ,w,h, app.screen.width, app.screen.height)
}
resize()
window.onresize = resize;

const scale_point = (x,y) => {
    const new_x = ((x / ((max_dist+additional_dist) * 2)) * app.screen.width) + (app.screen.width / 2);
    const new_y = ((y / ((max_dist+additional_dist) * 2)) * app.screen.height) + (app.screen.height / 2);
    return [new_x,new_y]
};