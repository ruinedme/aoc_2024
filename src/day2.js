/**
 * 
 * @param {Buffer} input 
 */
const day2_1 = (input) => {
    const lines = input.toString().split('\r\n');
    let total = 0;
    lines.forEach((v,i,a) => {
        const levels = v.split(' ').map((x) => parseInt(x));

        if (isSafe(levels)) total++;
    });

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day2_2 = (input) => {
    const lines = input.toString().split('\r\n');
    let total = 0;
    lines.forEach((line) => {
        const levels = line.split(' ').map((x) => parseInt(x));
        
        if (isSafe(levels)){
            total++;
        } else {
            // apply dampener
            // Now, the same rules apply as before, except if removing a single level from an unsafe report would make it safe, 
            // the report instead counts as safe.
            // There is almost certainly a better way to do this
            for (let i=0;i<levels.length;i++){   
                if (isSafe(levels.filter((_,idx) => idx !== i))) {
                    total++;
                    break;
                }
            }
        }
    });

    console.log(`Answer: ${total}`);
};

/**
 * The levels are either all increasing or all decreasing.
 * 
 * Any two adjacent levels differ by at least one and at most three.
 * 
 * @param {number[]} input 
 */
const isSafe = (input) => {
    const isDesending = input[0] - input[1] >= 1 && input[0] - input[1] <= 3;
    let ret = true;
    // decesending
    if (isDesending){
        let previous = input[0];
        for (let i = 1;i < input.length;i++){
            let next = input[i];
            if (previous - next >=1 && previous - next <= 3 ) {
                previous = next;
            } else {
                ret = false;
                break;
            }
        }
    } else {
        let previous = input[0];
        for (let i = 1;i < input.length;i++){
            let next = input[i];
            if (next - previous >=1 && next - previous <= 3 ) {
                previous = next;
            } else {
                ret = false;
                break;
            }
        }
    }

    // if (ret){
    //     console.log(input, ' desending: ', isDesending, ' safe: ', ret);
    // }
    return ret;
};

/**
 * 
 * @param {Buffer} input 
 */
const day2 = (input) => {
    day2_1(input);
    day2_2(input);
};

module.exports = {
    day2
}