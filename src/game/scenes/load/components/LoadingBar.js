import {divide} from '@kayac/utils';

export function LoadingBar(view) {
    const mask = view.getChildByName('mask');

    update(1);

    return {
        get width() {
            return mask.width;
        },

        update,
    };

    function update(progress) {
        mask.scale.x = divide(progress, 100);
    }
}
