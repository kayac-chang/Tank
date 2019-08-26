const {defineProperty} = Object;

export function observe({key, value, onChange}, it) {
    const proxy = {
        get() {
            return value;
        },
        set(num) {
            value = num;

            onChange.call(it, value);
        },
    };

    proxy.set(value);

    return defineProperty(it, key, proxy);
}
