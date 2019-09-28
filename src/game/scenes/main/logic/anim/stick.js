import {waitByFrameTime} from '@kayac/utils';

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

    if (list.length > 0) {
        app.sound.play('Stick');

        await waitByFrameTime(1000);

        for (const sticker of list) {
            //
            grid.showEnergy(sticker);

            await waitByFrameTime(250);
        }

        app.once('Idle', () =>
            list.forEach((sticker) => sticker.alpha = 0)
        );
    }
}
