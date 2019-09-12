
export function match(target, symbols) {
    const list = [];

    symbols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            if (col === target) {
                list.push({row: rowIndex, col: colIndex});
            }
        });
    });

    return list;
}
