import {throttle, abs, select, isMobile} from '@kayac/utils';

// import {isMobile} from 'pixi.js/lib/core/utils';

import screenfull from 'screenfull';

function getClientSize(target) {
    const {clientWidth, clientHeight} = target;
    return {width: clientWidth, height: clientHeight};
}

function getWindowSize() {
    return getClientSize(document.documentElement);
}

export function isLandScape() {
    return matchMedia('all and (orientation:landscape)').matches;
}

function getExpectSize() {
    const size = getWindowSize();

    const expectRadio = (16 / 9);
    const currentRadio = (size.width / size.height);

    if (currentRadio > expectRadio) {
        size.width = size.height * expectRadio;
    } else {
        size.height = size.width / expectRadio;
    }

    return size;
}

function setSize(target, {width, height}) {
    target.width = width;
    target.height = height;
}

function setStyleSize(target, {width, height}) {
    if (!target) return;
    target.style.width = width + 'px';
    target.style.height = height + 'px';
}

export function enableFullScreenMask() {
    const icon = select('#icon');
    const mask = select('#mask');

    if (!isMobile.apple.device) {
        select('#screen-scroll')
            .classList.add('hidden');

        const func =
            (el, className) => isLandScape() ?
                el.classList.add(className) :
                el.classList.remove(className);

        func(icon, 'hidden');

        scrollTo(0, 0);

        window.addEventListener('orientationchange', () => {
            const func =
                (el, className) => !isLandScape() ?
                    el.classList.add(className) :
                    el.classList.remove(className);

            func(icon, 'hidden');

            scrollTo(0, 0);
        });

        app.view.addEventListener('touchend', () => {
            if (screenfull.enabled) {
                screenfull.request();
            }
        });

        return;
    }

    icon.classList.remove('hidden');
    mask.classList.remove('hidden');

    window.addEventListener('resize', handle());
    window.addEventListener('orientationchange', handle());

    function handle() {
        return throttle(() => {
            const isMinimal = forApple();

            const func =
                (el, className) => isMinimal && isLandScape() ?
                    el.classList.add(className) :
                    el.classList.remove(className);

            func(icon, 'hidden');
            func(mask, 'hidden');

            scrollTo(0, 0);
        }, 500);
    }

    function forApple() {
        const maxHeight = Math.max(
            document.documentElement.clientHeight,
            outerHeight,
        );
        return abs(maxHeight - innerHeight) <= 50;
    }
}

export function resize(app) {
    const size = getExpectSize();

    setStyleSize(app.view.parentElement, size);
    setSize(app.view, size);

    app.renderer
        .resize(size.width, size.height);

    app.stage.children
        .forEach((scene) => {
            const expectStageSize = {width: 1920, height: 1080};
            scene.scale.x = size.width / expectStageSize.width;
            scene.scale.y = size.height / expectStageSize.height;
        });
}
