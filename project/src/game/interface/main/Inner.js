import {Button} from '../components';
import {scaleDown, scaleUp} from '../../effect';

const {assign} = Object;

const TRANS = {
    IN: {easing: 'easeOutCirc', duration: 260},
    OUT: {easing: 'easeInCirc', duration: 260},
};

export function Inner(it) {
    const isDigit = /^\d+$/;

    const selects =
        it.children
            .reduce(pre, [])
            .map(Select);

    return assign(it, {open, close, update});

    function pre(selects, child) {
        const {name} = child;

        if (isDigit.test(name)) {
            //
            const index = name;

            if (!selects[index]) selects[index] = {};

            selects[index]['btn'] = child;
            //
        } else if (name.includes('text')) {
            //
            const index = name.split('@')[1];

            if (!selects[index]) selects[index] = {};

            selects[index]['field'] = child;
            //
        }
        return selects;
    }

    function Select({btn, field}) {
        btn = Button(btn);

        btn.on('click', onSelect);

        let activate = false;

        let func = undefined;

        const it = {
            get index() {
                return Number(btn.name);
            },

            get func() {
                return func;
            },
            set func(value) {
                func = value;
            },

            get text() {
                return field.text;
            },
            set text(value) {
                field.text = value;
            },

            get visible() {
                return btn.visible;
            },
            set visible(flag) {
                btn.visible = flag;
                field.visible = flag;
            },

            get activate() {
                return activate;
            },
            set activate(flag) {
                activate = flag;

                btn.tint = activate ? 0xFFB300 : 0x616161;
            },
        };

        return it;

        function onSelect() {
            selects.forEach((it) => it.activate = false);

            it.activate = true;

            app.user[func] = it.index;
        }
    }

    function update(func) {
        const options = app.user[`${func}Options`];

        const current = app.user[func];

        selects.forEach((select) => {
            const {index} = select;

            const value = options[index];

            if (value !== undefined) {
                select.visible = true;

                select.text = value;

                select.activate = (current === index);

                select.func = func;
                //
            } else {
                select.visible = false;
                //
            }
        });
    }

    async function open() {
        it.visible = true;

        const config = {targets: it.children, ...TRANS.IN};

        await scaleUp(config).finished;
    }

    async function close() {
        const config = {targets: it.children, ...TRANS.OUT};

        await scaleDown(config).finished;

        it.visible = false;
    }
}
