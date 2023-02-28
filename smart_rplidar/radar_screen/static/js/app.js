//========== init ==========\\
const app_sides_length = 1000
const max_dist = 6000;

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
const canvas_host = document.getElementById("radar-screen");
canvas_host.appendChild(app.view);

const scale_point = (x,y) => {
    const new_x = ((x / (max_dist * 2)) * app_sides_length) + (app_sides_length / 2);
    const new_y = ((y / (max_dist * 2)) * app_sides_length) + (app_sides_length / 2);
    return [new_x,new_y]
};