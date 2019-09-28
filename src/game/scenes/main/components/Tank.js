import {Container, Sprite, AnimatedSprite} from 'pixi.js';
import {Control} from './Control';

const res = app.resource.get;
const {values, assign} = Object;

export function Tank() {
    const it = new Container();

    const tank = new Sprite(
        res('tanks').textures[`tank_blue.png`]
    );

    const shot = Shot();

    shot.position.y = tank.height / 2;

    it.addChild(tank, shot);

    Control({
        'w': up,
        'a': left,
        's': down,
        'd': right,
        ' ': () => shot.fire(),
    }, it);

    return it;
}

function up() {
    this.position.y -= 10;
    this.angle = 180;
}

function left() {
    this.position.x -= 10;
    this.angle = 90;
}

function down() {
    this.position.y += 10;
    this.angle = 0;
}

function right() {
    this.position.x += 10;
    this.angle = 270;
}

function Shot() {
    const view = new AnimatedSprite(values(res('shot').textures));

    const it = assign(view, {fire, hide});

    it.animationSpeed = 0.33;

    it.loop = false;

    it.onComplete = hide.bind(it);

    it.hide(it);

    return it;
}

function fire() {
    this.alpha = 1;
    this.gotoAndPlay(0);
}

function hide() {
    this.alpha = 0;
}
