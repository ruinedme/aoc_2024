
const Operators = {
    ADD: 0,
    MULTIPLY: 1,
};

const ops = Array.from([0,1]);

/**
 * 
 * @param {Buffer} input 
 */
const day7_1 = (input) => {
    let total = 0;
    const lines = input.toString().split('\r\n');

    lines.forEach((line) => {
        const sep = line.indexOf(':');
        const target = parseInt(line.substring(0, sep));
        const values = line.split(' ').slice(1).map((x) => parseInt(x));
        const totalOps = values.length -1;
        const combos = [];
        let t = new Array(totalOps);
        t.fill(0);

        console.log(totalOps, ', ', ops.length);
        for (let i=0;i< totalOps;i++){
            for (let j= 0;j< ops.length;j++) {

                t[i] = ops[j];
                combos.push(t);
                console.log(combos);
            }
        }
        console.log(combos);
        // // all add
        // let t = values.reduce((a,b) => a +b);
        // if (t === target) total++;
        // // all multiply
        // t = values.reduce((a,b) => a * b)
        // if (t === target) total++;
    });

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day7_2 = (input) => {
    let total = 0;

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day7 = (input) => {
    day7_1(input);
    day7_2(input);
};

module.exports = {
    day7
};
