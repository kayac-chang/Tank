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

    set(x, y) {
        this.#gameObject.position.x = x;
        this.#gameObject.position.y = y;

        sync(this.#gameObject);
    }
}

function sync(gameObject) {
    if (!gameObject.rigidBody) return;

    gameObject.rigidBody.angle = gameObject.rotation;

    Body.setPosition(gameObject.rigidBody, gameObject.position);
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

            rigidBody.gameObject = this;

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
