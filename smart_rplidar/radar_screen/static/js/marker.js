const marker_list = [];

const add_test_markers = () => {
    const offset = 2000;
    add_marker(-offset,-offset)
    add_marker(0,-offset)
    add_marker(offset,-offset)
    add_marker(-offset,0)
    add_marker(0,0)
    add_marker(offset,0)
    add_marker(-offset,offset)
    add_marker(0,offset)
    add_marker(offset,offset)
}

const add_marker = (pos_x, pos_y) => {
    marker_list.push({
        x: pos_x,
        y: pos_y,
        marked: false
    })
}

const markers_container = new PIXI.Container();
app.stage.addChild(markers_container);

const draw_markers = () =>{
    while(markers_container.children[0]){
        markers_container.removeChild(markers_container.children[0]);
    }
    for(let i = 0; i < marker_list.length; i++){
        const point_data = marker_list[i];

        const [x,y] = scale_point(point_data.x, point_data.y)

        point_data.marked = Math.random() < 0.5;

        let color = color_fail;
        if(point_data.marked) {
            color = color_success
        }

        const point = new PIXI.Graphics();
        point.beginFill(color)
        .drawCircle(0,0,20)
        .endFill();
        point.x = x;
        point.y = y;
        markers_container.addChild(point);
    }
}