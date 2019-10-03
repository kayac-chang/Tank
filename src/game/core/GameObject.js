import {construct} from 'ramda';

import {Container} from 'pixi.js';

import {Body} from 'matter-js';

import {addSubject, removeSubject} from './physic';

class Transformer {
    //
    #gameObject;

    constructor(gameObject) {
        this.#gameObject = gameObject;
    }

    get x() {
        return this.#gameObject.position.x;
    }

    set x(value) {
        this.#gameObject.position.x = value;

        sync(this.#gameObject);
    }

    get y() {
        return this.#gameObject.position.y;
    }

    set y(value) {
        this.#gameObject.position.y = value;

        sync(this.#gameObject);
    }

    get rotation() {
        return this.#gameObject.rotation;
    }

    set rotation(value) {
        this.#gameObject.rotation = value;

        sync(this.#gameObject);
    }
}

function sync({rigidBody, position, rotation}) {
    if (!rigidBody) return;

    rigidBody.angle = rotation;

    Body.setPosition(rigidBody, position);
}

class GameObject extends Container {
    //
    transformer = new Transformer(this);

    #sprite;

    #rigidBody;

    get sprite() {
        return this.#sprite;
    }

    set sprite(sprite) {
        this.removeChild(this.#sprite);

        this.#sprite = sprite;

        this.addChild(sprite);
    }

    get rigidBody() {
        return this.#rigidBody;
    }

    set rigidBody(rigidBody) {
        if (rigidBody) {
            this.#rigidBody = rigidBody;

            addSubject(this);
        } else {
            removeSubject(this);

            this.#rigidBody = undefined;
        }
    }

    destroy(options) {
        this.rigidBody = undefined;

        this.removeAllListeners();

        super.destroy(options);
    }
}

export default construct(GameObject);
