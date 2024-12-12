const { Grid } = require('./utils/grid');
const CR = '\r'.charCodeAt(0);
const LF = '\n'.charCodeAt(0);

// [x,y]
const vectors = [
    [0, -1], [1, -1], [1, 0], [1, 1],
    [0, 1], [-1, 1], [-1, 0], [-1, -1]
];

/**
 * 
 * @param {Buffer} input 
 */
const day4_1 = (input) => {
    const wordsearch = new Grid(input);
    const toMatch = 'XMAS';
    let total = 0;

    wordsearch.grid.forEach((value, index) => {
        if (value === toMatch.charCodeAt(0)) {
            const { row, col } = wordsearch.getRowCol(index);
            vectors.forEach((dir) => {
                // console.log(`${index} -> ${dir}`);
                const word = new Array(toMatch.length);
                for (let i = 0; i < toMatch.length; i++) {
                    try {
                        const idx = wordsearch.getIndex(row + (dir[1] * i), col + (dir[0] * i));
                        word[i] = wordsearch.grid[idx];
                    } catch (err) {
                        break;
                    }
                }
                let t = Buffer.from(word);
                if (t.toString() === toMatch) total++;
            });
        }
    });

    console.log(`Asnwer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day4_2 = (input) => {
    const wordsearch = new Grid(input);
    const toMatch = 'MAS';
    let total = 0;

    wordsearch.grid.forEach((value, index) => {
        if (value === toMatch.charCodeAt(1)) {
            const { row, col } = wordsearch.getRowCol(index);
            if (col < wordsearch.width - 1 && col > 0 && row > 0 && row < wordsearch.height) {
                const topLeft = wordsearch.grid[wordsearch.getIndex(row - 1, col - 1)];  //M | S
                const bottomRight = wordsearch.grid[wordsearch.getIndex(row + 1, col + 1)]; //S | M && opposite of topLeft
                const topRight = wordsearch.grid[wordsearch.getIndex(row - 1, col + 1)];
                const bottomLeft = wordsearch.grid[wordsearch.getIndex(row + 1, col - 1)];
                if (
                    ((topLeft === toMatch.charCodeAt(0) && bottomRight === toMatch.charCodeAt(2)) ||
                        (topLeft === toMatch.charCodeAt(2) && bottomRight === toMatch.charCodeAt(0))) &&
                    ((topRight === toMatch.charCodeAt(0) && bottomLeft === toMatch.charCodeAt(2)) ||
                        (topRight === toMatch.charCodeAt(2) && bottomLeft === toMatch.charCodeAt(0)))
                ) {
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