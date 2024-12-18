const { Grid } = require('./utils/grid');

/**
 * 
 * @param {Buffer} input 
 */
const day8_1 = (input) => {
    const map = new Grid(input);
    
    let total = 0;

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day8_2 = (input) => {
    let total = 0;

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day8 = (input) => {
    day8_1(input);
    day8_2(input);
};

module.exports = {
    day8
};
