//========== points ==========\\
const points_container = new PIXI.Container();
app.stage.addChild(points_container);

const draw_points = (data) =>{
    while(points_container.children[0]){
        points_container.removeChild(points_container.children[0]);
    }
    for(let i = 0; i < data.length; i++){
        const point_data = data[i];

        const [x,y] = scale_point(point_data.x, point_data.y)

        const point = new PIXI.Graphics();
        point.beginFill(color_hilight)
        .drawCircle(0,0,10)
        .endFill();
        point.x = x;
        point.y = y;
        points_container.addChild(point);
    }
}