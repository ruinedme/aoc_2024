const CR = '\r'.charCodeAt(0);
const LF = '\n'.charCodeAt(0);

/**
 * 
 * @param {Buffer} input 
 */
const day4_1 = (input) => {
    const toMatch = 'XMAS';
    const gridWidth = input.indexOf('\r\n');
    const grid = input.filter((value) => value !== CR && value !== LF);
    let total = 0;
    const MAX_ROW = Math.floor(grid.length / gridWidth);
    grid.forEach((value, index) => {
        if (value === toMatch.charCodeAt(0)) {
            const row = Math.floor(index / gridWidth);
            const col = index % gridWidth;

            // left -> right
            if (col <= gridWidth - toMatch.length) {
                let t = grid.slice(index, index + toMatch.length);
                if (t.toString() === toMatch) {
                    total++;
                    // console.log('found forward match on row', row);
                }
            }

            // right -> left
            if (col >= toMatch.length - 1) {
                // .slice() does shallow copy, causing .reverse() to reverse the whole grid not just the slice
                let t = grid.slice(index - toMatch.length + 1, index + 1).toReversed();
                if (Buffer.from(t).toString() === toMatch) {
                    total++;
                    // console.log('found backward match on row', row);
                }
            }

            // up
            if (row >= toMatch.length - 1) {
                let t = Buffer.from([grid[index], grid[gridWidth * (row - 1) + col], grid[gridWidth * (row - 2) + col], grid[gridWidth * (row - 3) + col]]);
                if (t.toString() === toMatch) {
                    total++;
                    // console.log('found up vertical match on col: ', col);
                }
            }

            // down
            if (row <= MAX_ROW - toMatch.length) {
                let t = Buffer.from([grid[index], grid[gridWidth * (row + 1) + col], grid[gridWidth * (row + 2) + col], grid[gridWidth * (row + 3) + col]]);
                if (t.toString() === toMatch) {
                    total++;
                    // console.log('found down vertical match on col: ', col);
                }
            }

            // up/right diagonal
            if (row >= toMatch.length - 1 && col <= gridWidth - toMatch.length) {
                let t = Buffer.from([grid[index], grid[gridWidth * (row - 1) + col + 1], grid[gridWidth * (row - 2) + col + 2], grid[gridWidth * (row - 3) + col + 3]]);
                if (t.toString() === toMatch) {
                    total++;
                    // console.log('found up/right diagonal match on ', row, ', ', col);
                }
            }

            // down/right diagonal
            if (row <= MAX_ROW - toMatch.length && col <= gridWidth - toMatch.length) {
                let t = Buffer.from([grid[index], grid[gridWidth * (row + 1) + col + 1], grid[gridWidth * (row + 2) + col + 2], grid[gridWidth * (row + 3) + col + 3]]);
                if (t.toString() === toMatch) {
                    total++;
                    // console.log('found down/right diagonal match on ', row, ', ', col);
                }
            }

            // down/left diagonal
            if (row <= MAX_ROW - toMatch.length && col >= toMatch.length - 1) {
                let t = Buffer.from([grid[index], grid[gridWidth * (row + 1) + col - 1], grid[gridWidth * (row + 2) + col - 2], grid[gridWidth * (row + 3) + col - 3]]);
                if (t.toString() === toMatch) {
                    total++;
                    // console.log('found down/left diagonal match on ', row, ', ', col);
                }
            }

            // up/left diagonal
            if (row >= toMatch.length - 1 && col >= toMatch.length - 1) {
                let t = Buffer.from([grid[index], grid[gridWidth * (row - 1) + col - 1], grid[gridWidth * (row - 2) + col - 2], grid[gridWidth * (row - 3) + col - 3]]);
                if (t.toString() === toMatch) {
                    total++;
                    // console.log('found up/left diagonal match on ', row, ', ', col);
                }
            }
        }
    });

    console.log(`Asnwer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day4_2 = (input) => {
    const toMatch = 'MAS';
    const gridWidth = input.indexOf('\r\n');
    const grid = input.filter((value) => value !== CR && value !== LF);
    const MAX_ROW = Math.floor(grid.length / gridWidth);
    let total = 0;
    grid.forEach((value, index) => {
        if (value === toMatch.charCodeAt(1)) {
            const row = Math.floor(index / gridWidth);
            const col = index % gridWidth;
            if(col < gridWidth - 1 && col > 0 && row > 0 && row < MAX_ROW){
                const topLeft = grid[gridWidth * (row - 1) + col - 1];  //M | S
                const bottomRight = grid[gridWidth * (row + 1) + col + 1]; //S | M && opposite of topLeft
                const topRight = grid[gridWidth * (row - 1) + col + 1];
                const bottomLeft = grid[gridWidth * (row + 1) + col - 1];
                if (
                    ((topLeft === toMatch.charCodeAt(0) && bottomRight === toMatch.charCodeAt(2)) ||
                    (topLeft === toMatch.charCodeAt(2) && bottomRight === toMatch.charCodeAt(0))) &&
                    ((topRight === toMatch.charCodeAt(0) && bottomLeft === toMatch.charCodeAt(2)) ||
                    (topRight === toMatch.charCodeAt(2) && bottomLeft === toMatch.charCodeAt(0)))
                ) {
                    // console.log(row, ', ', col);
                    total++;
                }
            }
        }
    });

    console.log(`Answer: ${total}`);
}

/**
 * 
 * @param {Buffer} input 
 */
const day4 = (input) => {
    day4_1(input);
    day4_2(input);
};

module.exports = {
    day4
};