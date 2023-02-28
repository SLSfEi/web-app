//grid dots
const grid_container = new PIXI.Container();
app.stage.addChild(grid_container);
const grid_divider = 7;

// dots
const grid_distance = (app.screen.width) / (grid_divider - 1);
for(var i = 0; i < grid_divider*grid_divider; i++){
    const point = new PIXI.Graphics()
    point.beginFill(color_normal)
    .drawCircle(0,0,5)
    .endFill()
    point.x = ((i % grid_divider) * grid_distance);
    point.y = (Math.floor(i / grid_divider) * grid_distance);
    grid_container.addChild(point);
}

// lines
const line = new PIXI.Graphics();
line.lineStyle(1, color_normal, 1)
.moveTo(app.screen.width / 2, 0)
.lineTo(app.screen.width / 2, app.screen.height)
grid_container.addChild(line)

line.lineStyle(1, color_normal, 1)
.moveTo(0, app.screen.height / 2)
.lineTo(app.screen.width, app.screen.height / 2)
grid_container.addChild(line)