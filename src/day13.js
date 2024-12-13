
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
    // solution derived from https://topaz.github.io/paste/#XQAAAQCKBwAAAAAAAAAhmwgnqZ6DjkGY9civ+T4mxCE65XuEX3nllrW/CGoEP4hLehriZAaCgtMzmYGPauem0TJ/52VbdR5aHZAL7sR4EVqfJ0lv1N5oD4vCnF3zGiej/qTq9bFozUqjrVsnrLW0kE3Zrzn2PGwCrWjmHauViQymoGKOSRt+x3XHOQsKGnXT0u9DcuTjW4C46I4wjqzWZA8o7JIUInLgNtymHm55MTNbBizYE9tsqwUOEme9dUyESyNccM3pn1dUiD1rE5SjFipF5KZTaUm0QM1Unh6Ol4xV3/jyH7gZ0CjeUxS+Ia4j0Yxe4/IEA/QBJQYbJ2VJ7nnzchEbitcZ8my0xW9EEC9hwhigb4V0K+90NXDIOSbY5oo7k5dyCUXSul3101O13GcghgH7i2IQc6l7U/7y54NqAZQzuwqSOI4H2YizfXGzDKjBY83QiOrHTNgq8avrI0BD3UUHYOwEyBTw7B921fn8buThZF+xnluDd9kfSnraQ2sDWzSGxuRy2ofnYhNOW2mubowyoFthdNhe5xr/Ye83sWsKBIV6DIVml+aIsiTokwn5rxHG1iJxwnvmunK9E0lo630Nwe2a3vRl7NnzzR1IvT2HaAIZbQcyZ3KiOqVFn5cusfZYa4LB8JnfBCIwj3x+j/PhxfKlNNQauOxY3ypkFkgLmko+Vp617J4vZ0mcgGeqer+JMJbnirK5/KJ/KsG+VmBmj3KfqlEPoH7MlOhqUffN2srKSmt5Pu8mtAEYlhAaAWvPZjs2FIK1SYXEA/hO8QT+/ADBSUaNGW9WH7Cm4ALDr9/CBcABYWC55tLGL7f1mTBrz/6w6sJZIIZEjOiPzKyh9j7Ba//2+3Uq
    // I knew this much, and assumed you could plug in arbitrary values for b until you got an answer that was a whole number
    // pX = (aX)a + (bX)b, pY = (aY)a + (bY)b; Solve for a and b 
    // a = (pX - (bX)b) / aX, (pY - (bY)b) / aY
    // Therefore: 
    // TODO: Learn Math
    // (pY-(bY)b) / aY = (pX - (bX)b) / aX
    // aX*pY - aX*bY*b = aY*pX - aY*bX*b (multiply both sides by the other's divisor)
    // b(aY*bX - aX*bY) = aY*pX - aX*pY // move both terms multiplied by b to one side
    // b = (aY*pX - aX*pY) / (aY*bX - aX*bY)
    
    // just becuase b is a whole number doesn't mean a is so we have to check both.
    if (
        (aY * pX - aX * pY) % (aY * bX - aX * bY) === 0
        && (pX - (bX * b)) % aX === 0
    ) {
            const b = (aY * pX - aX * pY) / (aY * bX - aX * bY);
            const a = (pX - (bX * b)) / aX;

            return (a * 3) + b;
    }
    // inital attemtped solution
    // seems you can't only rely on checking if remainders are present
    // for (let i =1;i<=limit;i++){
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
