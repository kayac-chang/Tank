export function select(query, comp) {
    comp = comp || document;

    const targets = comp.querySelectorAll(query);

    return (targets.length > 1) ? targets : targets[0];
}

export function remove(element) {
    return element.remove();
}

export function clear(comp) {
    const elements = select('*', comp);

    if (elements) elements.forEach(remove);
}

export function print(msg) {
    const log = createElement('p');
    log.textContent = msg;
}
