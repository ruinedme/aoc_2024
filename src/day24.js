const parseInput = (input) => {
    const lines = input.toString().split('\r\n\r\n');
    const wires = new Map();
    const gates = new Map();
    lines[0].split('\r\n').forEach((v) => {
        const t = v.split(': ');
        wires.set(t[0], parseInt(t[1]));
    });

    lines[1].split('\r\n').forEach((v) => {
        const t = v.split(' -> ');
        gates.set(t[1], t[0].split(' '));
    });

    return { wires, gates };
};

/**
 * 
 * @param {Map<string,number>} wires 
 * @returns number
 */
const buildOutput = (wires) => {
    let total = 0n;
    const output = [];
    wires.forEach((_v, k) => {
        if (k.startsWith('z')) {
            output.push(k);
        }
    });

    output.sort().reverse();
    output.forEach((k) => {
        const w = BigInt(wires.get(k));
        total = total << 1n;
        total += w;
    });

    return total;
};

/**
 * @param {string} out The wire that will be updated by the op
 * @param {string[]} op 
 * @param {Map<string, number>} wires 
 * @param {Map<string,string[]} gates
 */
const processGate = (out, op, wires,gates) => {
    while(!wires.has(op[0])){
        processGate(op[0],gates.get(op[0]),wires,gates);
    }
    const w1 = wires.get(op[0]);
    while(!wires.has(op[2])){
        processGate(op[2],gates.get(op[2]),wires,gates);
    }
    const w2 = wires.get(op[2]);
    const gate = op[1];

    let v;
    switch (gate) {
        case 'AND':
            v = w1 && w2 ? 1 : 0;
            break;
        case 'OR':
            v = w1 | w2;
            break;
        case 'XOR':
            v = w1 ^ w2;
            break;
        default:
            throw new Error(`Invalid gate found ${gate}`);
    }

    wires.set(out, v);
}

/**
 * 
 * @param {Buffer} input 
 */
const day24_1 = (input) => {
    const { wires, gates } = parseInput(input);

    gates.forEach((v, k) => {
        const w1 = v[0];
        while(!wires.has(w1)){
            processGate(w1,gates.get(w1),wires,gates);
        }
        const w2 = v[2];
        while(!wires.has(w2)){
            processGate(w2,gates.get(w2),wires,gates);
        }

        processGate(k, v, wires);
    });

    let total = buildOutput(wires);
    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day24_2 = (input) => {
    const { wires, gates } = parseInput(input);
    let total = 0;

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day24 = (input) => {
    day24_1(input);
    day24_2(input);
};

module.exports = {
    day24
};
