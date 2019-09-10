const {defineProperties} = Object;

export function Button(it) {
    it.interactive = true;
    it.buttonMode = true;

    return defineProperties(it, {

        enable: {
            configurable: true,

            get() {
                return it.interactive;
            },
            set(flag) {
                it.interactive = flag;

                it.alpha = (flag) ? 1 : 0.3;
            },
        },

    });
}
