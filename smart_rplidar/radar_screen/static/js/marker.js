const marker_list = [];

const markers_container = new PIXI.Container();
app.stage.addChild(markers_container);

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
    let texture = new PIXI.Graphics();
    texture.beginFill(0xFF0000)
    .drawCircle(0,0,20)
    .endFill();
    texture = app.renderer.generateTexture(texture);

    const sprite = new PIXI.Sprite(texture);
    sprite.anchor.set(0.5);
    const [x,y] = scale_point(pos_x, pos_y)
    sprite.x = x;
    sprite.y = y;
    markers_container.addChild(sprite);

    marker_list.push({
        x: pos_x,
        y: pos_y,
        marked: false,
        sprite: sprite
    })
}