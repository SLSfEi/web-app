const app = new PIXI.Application({ width: 1000, height: 1000 , background: '#1099bb' });
const canvas_host = document.getElementById("canvas-host");
canvas_host.appendChild(app.view);

const points_container = new PIXI.Container();
app.stage.addChild(points_container);

// Create a 5x5 grid of points
for (let i = 0; i < 25; i++) {
    const point = new PIXI.Graphics();
    point.beginFill(0xFFFF00);
    point.drawCircle(0,0,2);
    point.endFill();
    point.x = (i % 5) * 40;
    point.y = Math.floor(i / 5) * 40;
    points_container.addChild(point);
}

var hello = () => {
    console.log("hello?")
}

//points_container.x = app.screen.width / 2;
//points_container.y = app.screen.height / 2;

//points_container.pivot.x = points_container.width / 2;
//points_container.pivot.y = points_container.height / 2;