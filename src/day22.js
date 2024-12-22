const mix = (s,t) => {
    return s ^ t;
}

const prune = (s) => {
    return s % 16777216n;
}

/**
 * 
 * @param {BigInt} s 
 * @returns {BigInt}
 */
const next = (s) => {
    // if (memo.has(s)) return memo.get(s);
    const k = s;
    // step 1
    let t = s * 64n;
    s = mix(s,t);
    s = prune(s);
    // step 2
    t = s / 32n;
    s = mix(s,t);
    s = prune(s);
    // step 3
    t = s * 2048n;
    s = mix(s,t);
    s = prune(s);
    return s;
}

/**
 * 
 * @param {Buffer} input 
 */
const day22_1 = (input) => {
    const secrets = input.toString().split('\r\n').map((x) => BigInt(x));
    const values = [];
    secrets.forEach((secret) => {
        let value = secret;
        for (let i = 0;i< 2000;i++){
            value = next(value);
        }

        values.push(value);
    });

    let total = values.reduce((a,b) => a + b);
    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day22_2 = (input) => {
    const secrets = input.toString().split('\r\n').map((x) => BigInt(x));
    // const sequences = [];
    secrets.forEach((secret) => {
        const values = [];
        values.push({s: secret, p: secret % 10n, d: undefined});
        let value = secret;
        // let highest = values[0].p;
        for (let i = 1;i< 2000;i++){
            value = next(value);
            price = value % 10n;
            values.push({s: value, p: price, d: price - values[i-1].p});
            // if (price > highest && i > 4){
            //     highest = price;
            //     sequences.length = 0;
            //     sequences.push([values[i-3].d, values[i-2].d, values[i-1].d, values[i].d]);
            // } else if (price === highest && i > 4) {
            //     sequences.push([values[i-3].d, values[i-2].d, values[i-1].d, values[i].d]);
            // }
        }

        values.forEach((v) => {
            console.log(`${v.s}: ${v.p} (${v.d})`);
        });
    });

    // console.log(sequences);
    // let total = values.reduce((a,b) => a + b);
    let total = 0;
    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day22 = (input) => {
    day22_1(input);
    day22_2(input);
};

module.exports = {
    day22
};
