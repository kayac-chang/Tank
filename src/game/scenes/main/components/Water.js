import anime from 'animejs';

export function Waters(scene) {
    const waterStage = [1, 2, 2.8];
    const splashY = [710, 580, 450];

    const waters = [];
    const splashs = [];

    init();

    return waters;

    function init() {
        [0, 1, 2].forEach((index) => {
            const water = Water(
                select(`water@${index}`),
                index,
            );

            waters.push(water);

            const splash = Splash(
                select(`splash@${index}`),
            );

            splashs.push(splash);
        });

        app.on('SpinStart', () => {
            waters.forEach((water) => water.stage = 2);
        });

        app.on('ReelStop', ({index}) => {
            splashs[index].play();
        });

        app.on('Idle', () => {
            waters.forEach((water) => water.stage = 0);
        });
    }

    function Water(view, index) {
        let stage = waterStage.indexOf(view.scale.y);

        return {
            get stage() {
                return stage;
            },
            set stage(newStage) {
                update(newStage);
            },
        };

        function update(newStage) {
            anime({
                targets: view.scale,
                y: waterStage[newStage],

                easing: 'linear',
                duration: 1500,

                complete() {
                    stage = newStage;
                    splashs[index].y = splashY[stage];
                },
            });
        }
    }

    function select(name) {
        return scene.getChildByName(name);
    }
}

function Splash(view) {
    view.anim.loop = false;

    reset(view);

    return {
        get y() {
            return view.y;
        },
        set y(newY) {
            view.y = newY;
        },

        play() {
            playOnce(view);
        },
    };
}

function playOnce(view) {
    view.visible = true;
    view.anim.gotoAndPlay(0);

    view.anim.onComplete = () => reset(view);
}

function reset(view) {
    view.visible = false;

    view.anim.gotoAndStop(0);
}
