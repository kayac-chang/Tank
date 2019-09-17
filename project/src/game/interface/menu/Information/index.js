import {Page} from '../Page';
import {Button} from '../../components';
import {move, twink} from '../../../effect';

import {throttleBy} from '@kayac/utils';
import {Swipe} from '../Swip';

const {assign, defineProperties} = Object;

export function Information(it) {
    it = Page(it);

    const carousel = Carousel(it.select('carousel'));

    const prevButton = Button(it.select('arrow@prev'));
    prevButton.on('pointerup', throttleBy(onPrev));

    const nextButton = Button(it.select('arrow@next'));
    nextButton.on('pointerup', throttleBy(onNext));

    const tabs =
        it.select(({name}) => name.includes('tab'))
            .map(Button)
            .map((it) => {
                it.on('pointerup', () => onTabClick(it));
                return it;
            });

    onChange(carousel);

    carousel.on('Change', onChange);

    it.select('title').text = app.translate(`common:information.title`);

    return it;

    function onTabClick(it) {
        carousel.page = Number(it.name.split('@')[1]);
    }

    function onChange({page, length}) {
        tabs.forEach((it) => it.alpha = 0);

        tabs[page].alpha = 1;

        prevButton.interactive = !(page <= 0);
        nextButton.interactive = !(page >= length - 1);
    }

    function animation(targets) {
        return twink({targets, duration: 360});
    }

    async function onPrev() {
        await Promise.all([
            carousel.prev(),
            animation(prevButton),
        ]);
    }

    async function onNext() {
        await Promise.all([
            carousel.next(),
            animation(nextButton),
        ]);
    }
}

function Carousel(it) {
    const pages =
        it.children
            .filter(({name}) => name.includes('page'))
            .map((it) => {
                it = Swipe(it);

                it.on('Swipe', onSwipe);

                return it;
            });

    const distance = pages[0].width;

    assign(it, {prev, next});

    return defineProperties(it, {
        page: {
            get() {
                return Math.abs(pages[0].x / distance);
            },
            set(page) {
                const unit = (page - it.page);
                const displacement = -1 * (unit * distance);

                pages.forEach((page) => page.x += displacement);

                it.emit('Change', it);
            },
        },

        length: {
            get: () => pages.length,
        },
    });

    async function onSwipe(vector) {
        await it[vector]();

        it.emit('Change', it);
    }

    async function animation(vector) {
        await move({
            targets: pages,
            x: vector + distance,

            easing: 'easeOutCirc',

            duration: 360,
        }).finished;
    }

    async function prev() {
        if (it.page <= 0) return;

        await animation('+=');

        it.emit('Change', it);
    }

    async function next() {
        if (it.page >= it.length - 1) return;

        await animation('-=');

        it.emit('Change', it);
    }
}
