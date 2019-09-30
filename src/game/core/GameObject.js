import {Container} from 'pixi.js';


export default function constructor({sprite, body}) {
    const view = new Container();

    view.addChild(sprite);

    const it = {
        //
        get body() {
            return body;
        },
        //
        get view() {
            return view;
        },
        //
        get position() {
            return body.position;
        },
        set position({x, y}) {
            x = x || body.position.x;
            y = y || body.position.y;

            body.position = {x, y};
            view.position.set(x, y);
        },
        //
        get height() {
            return view.height;
        },
        set height(value) {
            view.height = value;

            body.scale = view.scale;
        },

        addChild,
    };

    app.on('Update', update.bind(it));

    // Init
    body.rotation = view.rotation;

    return it;
}

function update() {
    const {x, y} = this.body.position;

    this.view.position.set(x, y);

    this.view.rotation = this.body.rotation;
}

function addChild(...children) {
    this.view.addChild(...children);
}
