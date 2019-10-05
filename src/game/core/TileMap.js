import {Container, Sprite} from 'pixi.js';

export function TileMap({textureMap, structure}) {
    const it = new Container();

    const sprites = [];

    structure.forEach((row, rowIdx) => {
        //
        row.forEach((key, colIdx) => {
            const sprite = new Sprite(textureMap[key]);

            sprite.coordinate = {x: colIdx, y: rowIdx};

            sprite.position.set(
                sprite.width * colIdx,
                sprite.height * rowIdx
            );

            sprites.push(sprite);
        });
        //
    });

    it.addChild(...sprites);

    it.cacheAsBitmap = true;

    return it;
}
