const { Grid } = require("./utils/grid");
const WALL = '#'.charCodeAt(0);
const BOX = 'O'.charCodeAt(0);
const EMPTY = '.'.charCodeAt(0);
const ROBOT = '@'.charCodeAt(0);

// [x,y]
const vectors = [
    [0, -1], [1, 0], [0, 1], [-1, 0]
];

/**
 * 
 * @param {number} robot 
 * @param {number} dir 
 * @param {Grid} map 
 * @returns {boolean}
 */
const canMove = (robot,dir, map) => {
    const vec = vectors[dir];
    const {row, col} = map.getRowCol(robot);
    const toMove = map.getIndex(row + vec[1], col + vec[0]);
    if (map.grid[toMove] === EMPTY) {
        // const value = map.grid[robot];
        // map.grid[robot] = EMPTY;
        // map.grid[toMove] = value; 
        return true;
    }

    // Need to keep checking in the same direction until we find an empty space or a wall
    if (map.grid[toMove] === BOX){
        return canMove(toMove, dir, map);
    }

    // Found Wall (or other obstacle)
    return false;
};

/**
 * 
 * @param {Buffer} input 
 */
const day15_1 = (input) => {
    const split = input.indexOf('\r\n\r\n');
    const map = new Grid(input.subarray(0,split));
    const moves = input.toString().split('\r\n\r\n')[1].replaceAll('\r\n','');
    moves.split('').forEach((m) => {
        let dir;
        const robot = map.grid.indexOf(ROBOT);
        switch (m) {
            case '^':
                dir = 0;
                break;
            case '>':
                dir = 1;
                break;
            case 'v':
                dir = 2;
                break;
            case '<':
                dir = 3;
                break;
            default:
                throw new Error(`Invalid Move: ${m}`);
        }
        canMove(robot, dir, map);
    });
    map.display();
    // Get total GPS coords
    let total = 0;
    map.grid.forEach((b,i) => {
        if (b === BOX) {
            const {row, col} = map.getRowCol(i);
            total += 100 * (row + col);
        }
    });
    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day15_2 = (input) => {
    let total = 0;

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day15 = (input) => {
    day15_1(input);
    day15_2(input);
};

module.exports = {
    day15
};
