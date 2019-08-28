export * from './slot';

export * from './PayLines';
export * from './FreeGame';
export * from './Title';
export * from './Collect';
export * from './Grid';

export function pauseAll(it) {
    Object
        .values(it.transition)
        .forEach((anim) => anim.pause());
}
