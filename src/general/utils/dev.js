
export function isProduction() {
    return process.env.NODE_ENV === 'production';
}

/**
 * Debug Mode Logger:
 *      Set window.dev = true will open debug mode logger.
 * @param {any} msg?
 * @param {any[]} args
 */
export function log(msg, ...args) {
    if (isProduction()) return;

    console.log(msg, ...args);
}

export function err(msg, ...args) {
    if (isProduction()) return;

    console.error(msg, ...args);
}

export function table(msg, ...args) {
    if (isProduction()) return;

    console.table(msg, ...args);
}


