const marker_list = [];

const markers_container = new PIXI.Container();
app.stage.addChild(markers_container);

var on_marker_update = () => {
    let marked_count = 0
    for(let i = 0; i < marker_list.length ; i++){
        marker = marker_list[i];
        if(marker.marked){
            marked_count += 1
        }
    }
    const marked = document.getElementById("marked_marker")
    marked.innerText = marked.textContent = marked_count

    const total = document.getElementById("total_marker")
    total.innerText = total.textContent = marker_list.length
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
    const x_dist = (width_m*1000) / (number_x-1);
    const y_dist = (height_m*1000) / (number_y-1);

    const offset_x = (width_m*1000) / 2;
    const offset_y = (height_m*1000) / 2;

    for(let x = 0; x < number_x; x++){
        for(let y = 0; y < number_y; y++){
            const pos_x = (x*x_dist) - offset_x;
            const pos_y = (y*y_dist) - offset_y;
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