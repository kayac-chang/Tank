import {wait} from '@kayac/utils';

export async function stick({match, grid}) {
    //
    const list =
        match
            .map(({row, col}) => grid[row][col]['stick'])
            .filter(({alpha}) => alpha === 0)
            .map((sticker) => {
                //
                sticker.alpha = 1;

                sticker.transition['anim'].restart();

                return sticker;
            });

    await wait(1000);

    for (const sticker of list) {
        //
        grid.showEnergy(sticker);

        await wait(250);
    }

    app.once('Idle', () =>
        list.forEach((sticker) => sticker.alpha = 0)
    );
}
