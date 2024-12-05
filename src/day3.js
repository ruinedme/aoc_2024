/**
 * 
 * @param {Buffer} input 
 */
const day3_1 = (input) => {
    const s = input.toString();
    const regex = /mul\((\d{1,3}),(\d{1,3})\)/gm;
    let m;
    let total = 0;

    do {
        m = regex.exec(s);
        if (m){
            let x = parseInt(m[1]);
            let y = parseInt(m[2]);
            total += x * y;        
        }
    } while(m);

    console.log(`Asnwer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day3_2 = (input) => {
    const s = input.toString();
    const regex = /(mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/gm;
    let total = 0;
    let m;
    let isDo = true;
    do {
        m = regex.exec(s);
        if (m){
            if (m[0] === "don't()"){
                isDo = false;
            } else if (m[0] === 'do()') {
                isDo = true;
            } else {
                if (isDo){
                    const r = /mul\((\d{1,3}),(\d{1,3})\)/;
                    const m1 = r.exec(m[0]);
                    const x = m1[1];
                    const y = m1[2];
                    total += x * y;
                }
            }
        }
    } while(m);

    console.log(`Answer: ${total}`);
}

/**
 * 
 * @param {Buffer} input 
 */
const day3 = (input) => {
    day3_1(input);
    day3_2(input);
};

module.exports = {
    day3
};
