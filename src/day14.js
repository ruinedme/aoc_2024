// Fix for modulo on negative numbers
// https://web.archive.org/web/20090717035140if_/javascript.about.com/od/problemsolving/a/modulobug.htm
Number.prototype.mod = function(n) {
    return ((this % n) + n) % n;
};

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
    const width = 101;
    const height = 103;
    const vMid = Math.floor(width / 2);
    const hMid = Math.floor(height / 2);
    const quadrants = [0, 0, 0, 0]; // [TL,TR,BL,BR]

    robots.forEach((robot) => {
        // -n % x = -y why does nodejs treat remainders as signed ints?
        robot.pos.x = (robot.pos.x + robot.velocity.x * sims).mod(width);
        robot.pos.y = (robot.pos.y + robot.velocity.y * sims).mod(height);

        if (robot.pos.x < vMid && robot.pos.y < hMid) quadrants[0]++
        else if(robot.pos.x > vMid && robot.pos.y < hMid)  quadrants[1]++
        else if(robot.pos.x < vMid && robot.pos.y > hMid) quadrants[2]++
        else if(robot.pos.x > vMid && robot.pos.y > hMid) quadrants[3]++
    });

    const total = quadrants[0] * quadrants[1] * quadrants[2] * quadrants[3];
    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day14_2 = (input) => {
    const robots = parseInput(input);
    let total = 0;

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
