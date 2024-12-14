// Fix for modulo on negative numbers
// https://web.archive.org/web/20090717035140if_/javascript.about.com/od/problemsolving/a/modulobug.htm
Number.prototype.mod = function (n) {
    return ((this % n) + n) % n;
};

const width = 101;
const height = 103;
const vMid = Math.floor(width / 2);
const hMid = Math.floor(height / 2);

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

const getQuadrant = (robot) => {
    if (robot.pos.x < vMid && robot.pos.y < hMid) return 0
    else if (robot.pos.x > vMid && robot.pos.y < hMid) return 1;
    else if (robot.pos.x < vMid && robot.pos.y > hMid) return 2;
    else if (robot.pos.x > vMid && robot.pos.y > hMid) return 3;

    return -1;
};

/**
 * 
 * @param {Buffer} input 
 */
const day14_1 = (input) => {
    const robots = parseInput(input);
    const sims = 100;
    const quadrants = [0, 0, 0, 0]; // [TL,TR,BL,BR]

    robots.forEach((robot) => {
        // -n % x = -y why does nodejs treat remainders as signed ints?
        robot.pos.x = (robot.pos.x + robot.velocity.x * sims).mod(width);
        robot.pos.y = (robot.pos.y + robot.velocity.y * sims).mod(height);
        const quadrant = getQuadrant(robot);
        if (quadrant >= 0) quadrants[quadrant]++;
    });

    const total = quadrants.reduce((a, b) => a * b);
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
    let total = 0;

    const quadrants = [0, 0, 0, 0]; // [TL,TR,BL,BR]
    robots.forEach((robot) => {
        const quadrant = getQuadrant(robot);
        if (quadrant >= 0) quadrants[quadrant]++;
    });
    let danger = quadrants.reduce((a, b) => a * b);

    for (let i = 2; i < MAX_SIMS; i++) {
        
        for (r in robots) {
            let newX = (robots[r].pos.x + robots[r].velocity.x * i).mod(width);
            let newY = (robots[r].pos.y + robots[r].velocity.y * i).mod(height);

            const quadrant = getQuadrant({ pos: { x: newX, y: newY } });
            if (quadrant >= 0) quadrants[quadrant]++;
        }
        const newDanger = quadrants.reduce((a, b) => a * b);
        if (newDanger < danger) {
            danger = newDanger;
            total = i;
        }
        quadrants.fill(0);
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
