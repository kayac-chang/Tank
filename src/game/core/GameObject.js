const {create, assign, defineProperties} = Object;

function GameObject() {
}

export default function constructor({view, body}) {
    const it = create(GameObject.prototype);

    defineProperties(it, {
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
    });

    assign(it, {view, body});

    app.on('Update', update.bind(it));

    return it;
}

function update() {
    const {x, y} = this.body.position;

    this.view.position.set(x, y);
}
