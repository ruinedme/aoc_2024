const { Grid } = require('./utils/grid');

const CR = '\r'.charCodeAt(0);
const LF = '\n'.charCodeAt(0);
const OBSTACLE = '#'.charCodeAt(0);
const GUARD = '^'.charCodeAt(0);

const Direction = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3,
};

const turnRight = (currentDirection) => {
    if (currentDirection < 3) {
        currentDirection++;
    } else {
        currentDirection = 0;
    }

    return currentDirection;
};

/**
 * 
 * @param {Grid} map 
 * @returns {{visited: Set<number>, isLoop: boolean}}
 * @throws Invalid Direction Exception
 */
const walkRoute = (map) => {
    const visited = new Set();
    const corners = new Set();
    let location = map.grid.indexOf(GUARD);
    visited.add(location);
    let currentDirection = Direction.UP;
    let repeats = 0;
    const checkLoop = () => {
        currentDirection = turnRight(currentDirection);
        if (corners.has(location) && repeats < 4) {
            repeats++;
            return true;
        } else {
            corners.add(location);
            return false;
        }
    };

    const updateLocation = (n) => {
        location = n;
        visited.add(location);
    };

    outer: while (repeats < 4) {
        const row = Math.floor(location / map.height);
        const col = location % map.width;
        let next = location;
        switch (currentDirection) {
            case Direction.UP:
                if (row === 0) break outer;
                next = map.width * (row - 1) + col;
                map.grid[next] === OBSTACLE ? checkLoop() : updateLocation(next);
                break;
            case Direction.RIGHT:
                if (col === map.width - 1) break outer;
                next = map.width * row + col + 1;
                map.grid[next] === OBSTACLE ? checkLoop() : updateLocation(next);
                break;
            case Direction.DOWN:
                if (row === map.height - 1) break outer;
                next = map.width * (row + 1) + col;
                map.grid[next] === OBSTACLE ? checkLoop() : updateLocation(next);
                break;
            case Direction.LEFT:
                if (col === 0) break outer;
                next = map.width * row + col - 1;
                map.grid[next] === OBSTACLE ? checkLoop() : updateLocation(next);
                break;
            default:
                throw new Error('Invalid Direction');
        }
    };

    return { visited, isLoop: repeats >= 4 };
};

/**
 * 
 * @param {Buffer} input 
 */
const day6_1 = (input) => {
    const map = new Grid(input);

    const { visited } = walkRoute(map);
    console.log(`Answer: ${visited.size}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day6_2 = (input) => {
    const map = new Grid(input);
    const startLocation = map.grid.indexOf(GUARD);
    const { visited } = walkRoute(map);
    let total = 0;

    visited.forEach((v1) => {
        if (v1 !== startLocation) {
            map.grid[v1] = OBSTACLE;
            const { isLoop } = walkRoute(map);
            if (isLoop) total++;
            // reset for next loop
            map.grid[v1] = '.'.charCodeAt(0);
        }
    });
    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day6 = (input) => {
    day6_1(input);
    day6_2(input);
};

module.exports = {
    day6
};
