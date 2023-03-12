const enable_debug_pointer = () => {
    var position_text = new PIXI.Text("  0.000, 0.000", {
        align: "center"
    })
    app.stage.addChild(position_text);
    position_text.anchor.set(0,0);
    is_position_text_left = true;
    is_position_text_top = true;
    position_text.x = app.screen.width / 2;
    position_text.y = app.screen.height / 2
    
    // Enable interactivity!
    app.stage.eventMode = "dynamic";
    
    // Make sure the whole canvas area is interactive, not just the circle.
    app.stage.hitArea = app.screen;
    
    // Follow the pointer
    app.stage.addEventListener('pointermove', (e) => {
        const coord = reverse_scale_point(e.global.x, e.global.y)
        const bound = position_text.getBounds()
        position_text.text = `    ${coord[0].toFixed(3)}, ${coord[1].toFixed(3)}`
        position_text.position.copyFrom(e.global);
        if(is_position_text_left && bound.width + e.global.x > app.screen.width){
            is_position_text_left = false;
            if(is_position_text_top){
                position_text.anchor.set(1,0)
            } else {
                position_text.anchor.set(1,1)
            }
        }
        if(!is_position_text_left && e.global.x - bound.width < 0){
            is_position_text_left = true;
            if(is_position_text_top){
                position_text.anchor.set(0,0)
            } else {
                position_text.anchor.set(0,1)
            }
        }
        if(is_position_text_top && e.global.y + bound.height > app.screen.height){
            is_position_text_top = false;
            if(is_position_text_left){
                position_text.anchor.set(0,1);
            } else {
                position_text.anchor.set(1,1);
            }
        }
        if(!is_position_text_top && e.global.y - bound.height < 0){
            is_position_text_top = true;
            if(is_position_text_left){
                position_text.anchor.set(0,0);
            } else {
                position_text.anchor.set(1,0);
            }
        }
    });
    
    app.stage.addEventListener('pointerdown', (e) => {
        const coord = reverse_scale_point(e.global.x, e.global.y)
        console.log(coord)
    });
    return "Debug Pointer Enabled!!"
}