Number.prototype.xor  = function(n) {
    if (n === 0) return this;
    let res = 0;
    while (n > 0) {
        if ((this & 1 !== n & 1)) {
            res = res << 1;
            res++;
        }
        // this = this >> 1;
        n = n >> 1;
    }

    return res;
};

const parseInput = (input) => {
    const s = input.toString();
    const re = /(\d+)/gm;
    let a = parseInt(re.exec(s)[1]);
    let b = parseInt(re.exec(s)[1]);
    let c = parseInt(re.exec(s)[1]);
    const program = s.split('\r\n\r\n')[1].split(': ')[1].split(',').map((x) => parseInt(x));

    return {a,b,c, program};
}

const OPCODES = {
    ADV: 0,
    BXL: 1,
    BST: 2,
    JNZ: 3,
    BXC: 4,
    OUT: 5,
    BDV: 6,
    CDV: 7,
}

const runProgram = (a, b, c, program) => {
    let ip = 0;
    const output = [];
    const getComboOp = (op) => {
        switch (op) {
            case 0:
            case 1:
            case 2:
            case 3:
                return op;
            case 4:
                return a;
            case 5:
                return b;
            case 6:
                return c;
            case 7:
                throw new Error('combo op 7 is reserved');
            default:
                throw new Error('Invalid Combo Op');
        }
    };
    while (ip < program.length) {
        const op = program[ip];
        const literal = program[ip + 1];
        // const combo = getComboOp(literal);
        switch (op) {
            case OPCODES.ADV:

                a = Math.floor(a / (2 ** getComboOp(literal)));
                break;
            case OPCODES.BXL:
                // b = 8 - (b ^ literal & 255) % 8;
                console.log(`bxl: ${b} ^ ${literal} = ${b^literal}`)
                b = b ^ literal;
                break;
            case OPCODES.BST:
                b = getComboOp(literal) % 8;
                break;
            case OPCODES.JNZ:
                if (a !== 0) {
                    ip = literal;
                    continue;
                }
                break;
            case OPCODES.BXC:
                // b = 8 - (b ^ c & 255) % 8;
                console.log(`bxc: ${b} ^ ${c} = ${b.xor(c)}`);
                b = b ^ c;
                break;
            case OPCODES.OUT:
                const t = getComboOp(literal) % 8;
                output.push(t);
                break;
            case OPCODES.BDV:
                b = Math.floor(a / (2 ** getComboOp(literal)));
                break;
            case OPCODES.CDV:
                c = Math.floor(a / (2 ** getComboOp(literal)));
                break;
            default:
                throw new Error(`Invalid OpCode Received ${op}`);
        }

        ip += 2;
    }

    return output;
};
/**
 * 
 * @param {Buffer} input 
 */
const day17_1 = (input) => {
    const {a,b,c,program} = parseInput(input);
    const result = runProgram(a, b, c, program).join(',');

    console.log(`Answer: ${result}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day17_2 = (input) => {
    const {a,b,c,program} = parseInput(input);
    const match = program.join(',');
    console.log(program.length);
    let total = 0;
    // const outputs = new Set();
    // const low = Math.floor((a**2) /17);
    const hi = Math.floor((a**2));
    
    let round = a*(2**21);
    // let round = a * program.length;
    const increment = a % 8 === 0 ? 8 : a % 8;

    let result = runProgram(round, b, c, program);
    console.log(result.length);
    result = result.join(',');
    console.log(result);
    // while (round < hi) {
    //     const newValue = round;
    //     result = runProgram(newValue,b,c,program).join(',');
    //     // if (!outputs.has(result)){
    //     //     console.log(result);
    //     //     outputs.add(result);
    //     // }
    //     if (result === match) {
    //         total = newValue;
    //         break;   
    //     }

    //     round += increment;

    // }
    
    // console.log(result);
    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day17 = (input) => {
    day17_1(input);
    day17_2(input);
};

module.exports = {
    day17
};
