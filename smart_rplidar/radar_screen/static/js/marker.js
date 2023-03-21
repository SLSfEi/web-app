const marker_list = [];

const markers_container = new PIXI.Container();
app.stage.addChild(markers_container);

const marker_info_elem = document.getElementById("marker-info")

const on_marker_update = () => {
    if(marker_list.length == 0){
        marker_info_elem.innerText = marker_info_elem.textContent = "NO MARKERS"
        return;
    }
    let marked_count = 0;
    for(let i = 0; i < marker_list.length ; i++){
        marker = marker_list[i];
        if(marker.marked){
            marked_count += 1;
        }
    }
    marker_info_elem.innerText = marker_info_elem.textContent = `markers: ${marked_count} of ${marker_list.length}`
}

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

const add_marker_from_parameters = (width_m, height_m, number_x, number_y) => {
    let x_dist = 0;
    let y_dist = 0;

    let offset_x = 0;
    let offset_y = 0;
    
    if(number_x % 2 ==0){
        x_dist = (width_m*1000) / (number_x);
        x_dist += (x_dist / (number_x-1));
        offset_x = ((width_m*1000)) * -0.5;
    } else {
        x_dist = (width_m*1000) / (number_x);
        offset_x = ((width_m*1000) - x_dist) * -0.5;
    }
    if(number_y % 2 ==0){
        y_dist = (height_m*1000) / (number_y);
        y_dist += (y_dist / (number_y-1));
        offset_y = ((height_m*1000)) * -0.5;
    } else {
        y_dist = (height_m*1000) / (number_y);
        offset_y = ((height_m*1000) - y_dist) * -0.5;
    }

    console.log([x_dist, y_dist],[offset_x, offset_y])

    for(let x = 0; x < number_x; x++){
        for(let y = 0; y < number_y; y++){
            const pos_x = (x*x_dist) + offset_x;
            const pos_y = (y*y_dist) + offset_y;
            console.log([pos_x,pos_y])
            add_marker(pos_x,pos_y);
        }
    }
}

const add_marker = (pos_x, pos_y) => {
    const [x,y] = scale_point(pos_x, pos_y)

    const marker = {
        x: pos_x,
        y: pos_y,
        scale_x: x,
        scale_y: y,
        marked: false,
    }

    let texture = new PIXI.Graphics();
    texture.beginFill(0xFFFFFF,0.3)
    .drawCircle(0,0,40)
    .endFill()
    .beginFill(0xFFFFFF, 1)
    .drawCircle(0,0,10)
    .endFill();
    texture = app.renderer.generateTexture(texture);

    const sprite = new PIXI.Sprite(texture);
    marker.sprite = sprite;


    sprite.tint = color_fail;
    sprite.anchor.set(0.5);
    sprite.x = x;
    sprite.y = y;

    sprite.eventMode = "dynamic";
    sprite.buttonMode = true;
    sprite.cursor = "pointer";
    sprite.on("pointerdown", () => {
        if(marker.marked){
            // console.log("setting to false")
            marker.marked = false;
            marker.sprite.tint = color_fail
        } else {
            // console.log("setting to true")
            marker.marked = true;
            marker.sprite.tint = color_success
        }
        on_marker_update()
    })

    markers_container.addChild(sprite);

    marker_list.push(marker)
    on_marker_update()
}