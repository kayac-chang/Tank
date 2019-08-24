const {defineProperty} = Object;

export function observe({key, value, onChange}, it) {
    const proxy = {
        get() {
            return value;
        },
        set(num) {
            value = num;

            onChange(value);
        },
    };

    return defineProperty(it, key, proxy);
}
