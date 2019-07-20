/**
 *  wait ms milliseconds
 *  @param {number} ms
 *  @return {Promise}
 */
export function wait(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

/**
 *  wait for next frame
 *  @return {Promise}
 */
export function nextFrame() {
    return new Promise((r) => requestAnimationFrame(r));
}


