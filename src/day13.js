
/**
 * 
 * @param {string} input 
 * @returns {{aX: number, aY: number, bX: number, bY: number, pX: number, pY: number}}
 */
const parseInput = (input) => {
    // Why does this need to be in function scope to work on more than 1 string?
    const parseButton = /Button (?:A|B): X\+(\d+), Y\+(\d+)/gm
    const parsePrize = /Prize: X=(\d+), Y=(\d+)/gm

    const btnA = parseButton.exec(input);
    const btnB = parseButton.exec(input);
    const prize = parsePrize.exec(input);

    const aX = parseInt(btnA[1]);
    const aY = parseInt(btnA[2]);
    const bX = parseInt(btnB[1]);
    const bY = parseInt(btnB[2]);
    const pX = parseInt(prize[1]);
    const pY = parseInt(prize[2]);

    return {aX, aY, bX, bY, pX, pY};
};

/**
 * 
 * @param {{aX, aY, bX, bY, pX, pY}} values 
 * @returns {number}
 */
const calcAB = (values) => {
    const {aX, aY, bX, bY, pX, pY} = values;
    
    if (
        (aY * pX - aX * pY) % (aY * bX - aX * bY) === 0
        && (pX - (bX * b)) % aX === 0
    ) {
            const b = (aY * pX - aX * pY) / (aY * bX - aX * bY);
            const a = (pX - (bX * b)) / aX;

            return (a * 3) + b;
    }
    // inital solution
    // for (let i =1;i<=limit;i++){
    //     // console.log(`i:${i} = ${(pX - (bX * i)) % aX}, ${(pY - (bY * i)) % aY}`);
    //     if ((pX - (bX * i)) % aX === 0 && (pY - (bY * i)) % aY === 0)  {
    //         console.log(values, (pX - (bX * i)) / aX, i);
    //         // found possible value for pX
    //         const a = (pX - (bX * i)) / aX;
    //         return (a * 3) + i;
    //     }
    // }
    return 0;
}

/**
 * 
 * @param {Buffer} input 
 */
const day13_1 = (input) => {
    const machines = input.toString().split('\r\n\r\n');
    let total = 0;

    machines.forEach((s) => {
        const values = parseInput(s);

        total  += calcAB(values);        
    });

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day13_2 = (input) => {
    const machines = input.toString().split('\r\n\r\n');
    let total = 0;

    machines.forEach((s) => {
        const values = parseInput(s);
        values.pX += 10000000000000;
        values.pY += 10000000000000;
        total  += calcAB(values);        
    });

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day13 = (input) => {
    day13_1(input);
    day13_2(input);
};

module.exports = {
    day13
};
