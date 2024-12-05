/**
 * 
 * @param {Buffer} input 
 */
const day1_1 = (input) => {
    const { left, right } = parseInput(input);

    let total = 0;
    for (const i in left) {
        total += Math.abs(left[i] - right[i]);        
    }

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day1_2 = (input) => {
    const { left, right } = parseInput(input);
    let total = 0;
    left.forEach((value) => {
        let appearances = right.filter((x) => x === value).length;
        total += value * appearances;
    });

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day1 = (input) => {
    day1_1(input);
    day1_2(input);
};


/**
 * 
 * @param {Buffer} input 
 * @returns {{left: number[], right: number[]}}
 */
const parseInput = (input) => {
    const left = [], right= [];
    const lines = input.toString().split('\r\n');
    
    lines.forEach((v,i,a) => {
        const pairs = v.split('   ');
        left.push(parseInt(pairs[0]));
        right.push(parseInt(pairs[1]));
        
    });

    left.sort((a,b) => a - b);
    right.sort((a,b) => a - b);

    return {left,right};
};

module.exports = {
    day1
};
