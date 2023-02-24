//========== init ==========\\
const app_sides_length = 1000
const max_dist = 6000;

const app = new PIXI.Application(
    {
        width: app_sides_length,
        height: app_sides_length,
        transparent: false,
        background: '#FFFFFF'
    });
const canvas_host = document.getElementById("radar-screen");
canvas_host.appendChild(app.view);

//========== grid =========\\
const grid_container = new PIXI.Container();
app.stage.addChild(grid_container);
const grid_divider = 7;

// dots
const grid_distance = (app.screen.width) / (grid_divider - 1);
for(var i = 0; i < grid_divider*grid_divider; i++){
    const point = new PIXI.Graphics()
    point.beginFill(0x000000)
    .drawCircle(0,0,5)
    .endFill()
    point.x = ((i % grid_divider) * grid_distance);
    point.y = (Math.floor(i / grid_divider) * grid_distance);
    grid_container.addChild(point);
}

// lines
const line = new PIXI.Graphics();
line.lineStyle(1, 0x000000, 1)
.moveTo(app.screen.width / 2, 0)
.lineTo(app.screen.width / 2, app.screen.height)
grid_container.addChild(line)

line.lineStyle(1, 0x000000, 1)
.moveTo(0, app.screen.height / 2)
.lineTo(app.screen.width, app.screen.height / 2)
grid_container.addChild(line)

//========== points ==========\\
const points_container = new PIXI.Container();
app.stage.addChild(points_container);

const scale_point = (x,y) => {
    const new_x = ((x / (max_dist * 2)) * app_sides_length) + (app_sides_length / 2);
    const new_y = ((y / (max_dist * 2)) * app_sides_length) + (app_sides_length / 2);
    return [new_x,new_y]
};

const draw_points = (data) =>{
    while(points_container.children[0]){
        points_container.removeChild(points_container.children[0]);
    }
    for(let i = 0; i < data.length; i++){
        const point_data = data[i];

        const [x,y] = scale_point(point_data.x, point_data.y)

        const point = new PIXI.Graphics();
        point.beginFill(0xFF0000)
        .drawCircle(0,0,10)
        .endFill();
        point.x = x;
        point.y = y;
        points_container.addChild(point);
    }
}