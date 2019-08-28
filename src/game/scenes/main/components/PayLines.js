import {wait} from '@kayac/utils';

export function PayLines(it) {
    const list =
        it.children
            .reduce((list, child) => {
                const [type, index] = child.name.split('@');

                if (!list[index]) list[index] = {};

                list[index][type] = child;

                return list;
            }, [])
            .map(PayLine);

    app.on('ShowResult', showResult);

    return list;

    async function showResult({results}) {
        console.log(results);

        const lines =
            results.map(({line}) => list[line]);

        setAll('visible', true);

        await wait(2000);

        setAll('visible', false);

        app.once('Idle', onceIdle);

        async function onceIdle(lines) {
            let loop = true;

            while (loop) {
                for (const line of lines) {
                    setAll('visible', false);

                    line.visible = true;

                    await wait(2000);
                }
            }

            app.once('SpinStart', () => {
                setAll('visible', false);

                loop = false;
            });
        }

        function setAll(prop, value) {
            lines.forEach((line) => line[prop] = value);
        }
    }
}


function PayLine({inner, line}) {
    const it = {
        get visible() {
            return line.visible;
        },
        set visible(bool) {
            inner.visible = bool;
            line.visible = bool;
        },
    };

    it.visible = false;

    return it;
}
