export * from './normal';
export * from './respin';
export * from './test';

export function process(symbols) {
    return symbols.map(
        (icon, index) =>
            (icon === 0 && index !== 1) ?
                `${icon}${index}` : `${icon}`);
}
