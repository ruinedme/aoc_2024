const {Grid, Direction} = require('./utils/grid');
const ZERO = '0'.charCodeAt(0);

/**
 * 
 * @param {Buffer} input 
 */
const day10_1 = (input) => {
    const map = new Grid(input);
    map.grid = map.grid.map((v) => v - ZERO);

    const startingPoints = [];
    map.grid.forEach((v,i) => {
        if (v === 0) startingPoints.push(i);
    });

    console.log(startingPoints);
    let total = 0;
    for (let i = 0;i<startingPoints.length;i++){
        let pos = startingPoints[0];
        while(map.grid[pos] < 9) {
            const neighbors = map.getCardinalNeighbors(pos).filter((x) => x === map.grid[pos] + 1);
            if (neighbors.length === 0) break;
            
            if (map.grid[pos] + 1 === 9) total += 1;
        }
    }
    // startingPoints.forEach((v) => {
    //     total += travelPath(v, 0,9, map);
    // });

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day10_2 = (input) => {
    let total = 0;

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day10 = (input) => {
    day10_1(input);
    day10_2(input);
};

module.exports = {
    day10
};
