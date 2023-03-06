//========== points ==========\\
const max_radar_point = 1000;
const radar_points = [];

const points_container = new PIXI.ParticleContainer(max_radar_point);
points_container.interactiveChildren = false;
app.stage.addChild(points_container);

let radar_point_texture = new PIXI.Graphics();
radar_point_texture.beginFill(color_hilight)
.drawCircle(0,0,10)
.endFill();
radar_point_texture = app.renderer.generateTexture(radar_point_texture);

for(let i = 0; i < max_radar_point; i++){
    const point = new PIXI.Sprite(radar_point_texture);
    point.anchor.set(0.5);
    point.x = 0;
    point.y = 0;
    point.alpha = 1;
    points_container.addChild(point);
    radar_points.push(point);
}

const draw_points = (data) =>{
    for(let i = 0; i < max_radar_point; i++){
        const cur_point = radar_points[i];
        if(i >= data.length){
            cur_point.alpha = 0;
            continue;
        }
        const point_data = data[i];
        const [x,y] = scale_point(point_data.x, point_data.y)
        cur_point.x = x;
        cur_point.y = y;
        cur_point.alpha = 1;
    }
}