import {spin, show} from '../anim';
import {log} from '../../../../../general';

import {process} from './index';

export async function test({symbols, reels, effects}) {
    const result = process(symbols);

    await spin(reels, result);

    await show(effects, symbols);

    log('Round Complete...');
    app.emit('Idle');
}
