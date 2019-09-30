const {create, assign, defineProperties} = Object;

function GameObject() {
}

export default function constructor({view, body}) {
    const it = create(GameObject.prototype);

    defineProperties(it, {
        //
        body: {
            get() {
                return body;
            },
            set(value) {
                body = value;
            },
        },
        //
        position: {
            get() {
                return body.position;
            },
            set({x, y}) {
                x = x || body.position.x;
                y = y || body.position.y;

                body.position = {x, y};
                view.position.set(x, y);
            },
        },
        //
    });

    assign(it, {view});

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
