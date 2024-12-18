const { Grid } = require("./utils/grid");

/**
 * 
 * @param {Buffer} input 
 */
const day12_1 = (input) => {
    const map = new Grid(input);
    let total = 0;

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day12_2 = (input) => {
    let total = 0;

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day12 = (input) => {
    day12_1(input);
    day12_2(input);
};

module.exports = {
    day12
};
