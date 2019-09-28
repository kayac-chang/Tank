import {Container, Sprite} from 'pixi.js';

import {Control} from '../Base/Control';
import {ShotLight} from './ShotLight';
import {Bullet} from "./Bullet";

const {assign} = Object;

const {sin, cos} = Math;

const res = app.resource.get;

export function Tank() {
    const it = new Container();

    const tank = new Sprite(
        res('tanks').textures[`tank_blue.png`]
    );

    it.shotLight = ShotLight();

    it.shotLight.position.y = tank.height / 2;

    it.addChild(tank, it.shotLight);

    it.bullet = Bullet();

    Control({
        'w': forward,
        's': backward,
        'a': turnLeft,
        'd': turnRight,
        ' ': fire,
    }, it);

    return it;
}

function fire() {
    this.shotLight.alpha = 1;
    this.shotLight.gotoAndPlay(0);

    const bullet = this.bullet();

    const pos = this.shotLight.getGlobalPosition();

    bullet.position.set(pos.x, pos.y);
    bullet.angle = this.angle + 180;

    app.stage.addChild(bullet);
}

function forward() {
    const unit = 10;
    this.position.x -= sin(this.rotation) * unit;
    this.position.y += cos(this.rotation) * unit;
}

function backward() {
    const unit = 10;
    this.position.x += sin(this.rotation) * unit;
    this.position.y -= cos(this.rotation) * unit;
}

function turnLeft() {
    this.angle -= 10;
}

function turnRight() {
    this.angle += 10;
}
