// solution derived from https://github.com/sanvirk99/adventcode/blob/fa8d4d3649da13187d7e9a66f5b98c54c944d558/day11.py#L49
const memo = new Map();
/**
 * 
 * @param {number} num 
 * @param {number} i 
 * @returns 
 */
const dfs = (num, i) => {
    if (i === 0) return 1;

    const key = `${num}:${i}`;
    if (memo.has(key)) return memo.get(key);

    let count = 0;
    const arr = rules(num);
    arr.forEach((v) => {
        count += dfs(v,i-1);
    });

    memo.set(key, count);
    return count;
};

/**
 * 
 * @param {number} num 
 * @returns {number[]}
 */
const rules = (num) => {
    if (num === 0) {
        return [1];
    }

    const str = num.toString();
    if (str.length % 2 === 0){
        const left = str.substring(0,str.length / 2);
        const right = str.substring(str.length / 2);
        return [parseInt(left), parseInt(right)];
    }

    return [num * 2024];
}

/**
 * 
 * @param {Buffer} input 
 */
const day11_1 = (input) => {
    let stones = input.toString().split(' ').map((v) => parseInt(v));
    let total = 0;
    stones.forEach((v) => {
        total += dfs(v,25);
    });
    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day11_2 = (input) => {
    let rocks = input.toString().split(' ').map((v) => parseInt(v));
    let total = 0;
    rocks.forEach((v) => {
        total += dfs(v,75);
    });

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day11 = (input) => {
    day11_1(input);
    day11_2(input);
};

module.exports = {
    day11
};
