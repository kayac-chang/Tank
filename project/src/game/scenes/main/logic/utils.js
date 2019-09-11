
export function match(target, symbols) {
    let list = undefined;

    symbols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            if (col === target) {
                if (!list) list = [];

                list.push({row: rowIndex, col: colIndex});
            }
        });
    });

    return list;
}
