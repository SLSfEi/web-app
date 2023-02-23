const app = new PIXI.Application(
    {
        transparent: false,
        background: '#FFFFFF'
    });
const canvas_host = document.getElementById("radar-screen");
canvas_host.appendChild(app.view);

const points_container = new PIXI.Container();
app.stage.addChild(points_container);

// Create a 5x5 grid of points
for (let i = 0; i < 25; i++) {
    const point = new PIXI.Graphics();
    point.beginFill(0x000000)
    .drawCircle(0,0,2)
    .endFill();
    point.x = (i % 5) * 40;
    point.y = Math.floor(i / 5) * 40;
    points_container.addChild(point);
}

points_container.x = app.screen.width / 2;
points_container.y = app.screen.height / 2;

points_container.pivot.x = points_container.width / 2;
points_container.pivot.y = points_container.height / 2;