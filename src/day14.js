// Fix for modulo on negative numbers
// https://web.archive.org/web/20090717035140if_/javascript.about.com/od/problemsolving/a/modulobug.htm
Number.prototype.mod = function (n) {
    return ((this % n) + n) % n;
};

const width = 101;
const height = 103;

/**
 * 
 * @param {Buffer} input 
 * @returns {{oos: {x: number, y: number}, velocity: {x: number, y: number}}} Array of robots with initial position and velocity
 */
const parseInput = (input) => {
    /** @type {string[]} */
    const lines = input.toString().split('\r\n');
    const robots = [];
    lines.forEach((l) => {
        const values = /(-?\d+)+/gm;

        const px = parseInt(values.exec(l)[1]);
        const py = parseInt(values.exec(l)[1]);
        const vx = parseInt(values.exec(l)[1]);
        const vy = parseInt(values.exec(l)[1]);
        robots.push({ pos: { x: px, y: py }, velocity: { x: vx, y: vy } });
    });

    return robots;
};

/**
 * 
 * @param {Buffer} input 
 */
const day14_1 = (input) => {
    const robots = parseInput(input);
    const sims = 100;

    const vMid = Math.floor(width / 2);
    const hMid = Math.floor(height / 2);
    const quadrants = [0, 0, 0, 0]; // [TL,TR,BL,BR]

    robots.forEach((robot) => {
        // -n % x = -y why does nodejs treat remainders as signed ints?
        robot.pos.x = (robot.pos.x + robot.velocity.x * sims).mod(width);
        robot.pos.y = (robot.pos.y + robot.velocity.y * sims).mod(height);

        if (robot.pos.x < vMid && robot.pos.y < hMid) quadrants[0]++
        else if (robot.pos.x > vMid && robot.pos.y < hMid) quadrants[1]++
        else if (robot.pos.x < vMid && robot.pos.y > hMid) quadrants[2]++
        else if (robot.pos.x > vMid && robot.pos.y > hMid) quadrants[3]++
    });

    const total = quadrants[0] * quadrants[1] * quadrants[2] * quadrants[3];
    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Array} grid 
 */
const printGrid = (grid) => {
    for (let y = 0; y < height; y++) {
        let line = grid.slice(y * width, y * width + width).join('');
        console.log(line);
    }
}

const getIndex = (row, col) => {
    return width * row + col;
};

/**
 * 
 * @param {Buffer} input 
 */
const day14_2 = (input) => {
    const robots = parseInput(input);

    const MAX_SIMS = width * height;
    const grid = new Array(MAX_SIMS).fill('.');

    let total = 0;
    outer: for (let i = 2; i < MAX_SIMS; i++) {
        for (r in robots) {
            let oldX = (robots[r].pos.x + robots[r].velocity.x * (i - 1)).mod(width);
            let oldY = (robots[r].pos.y + robots[r].velocity.y * (i - 1)).mod(height);
            let newX = (robots[r].pos.x + robots[r].velocity.x * i).mod(width);
            let newY = (robots[r].pos.y + robots[r].velocity.y * i).mod(height);
            const oldIdx = getIndex(oldY, oldX);
            const newIdx = getIndex(newY, newX);
            grid[oldIdx] = '.';
            grid[newIdx] = 'X';

        }
        // At least in my input this only ever occurs twice, and both times are in the simulation that contains the easter egg
        toMatch = 'XXXXXXXXXXXXXXXXXXXXX';
        if (grid.join('').includes(toMatch)) {
            total = i;
            break outer;
        }
        // console.log('seconds: ', i);
        // printGrid(grid)
    }


    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day14 = (input) => {
    day14_1(input);
    day14_2(input);
};

module.exports = {
    day14
};
