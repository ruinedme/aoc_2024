const ZERO = '0'.charCodeAt(0);

/**
 * 
 * @param {Buffer} input 
 * @returns number[]
 */
const createDisk = (input) => {
    const disk = input.map((x) => x - ZERO);
    const size = disk.reduce((a, b) => a + b);
    // treat -1 as free space
    const expanded = new Array(size).fill(-1);
    let pos = 0;
    let id = 0;

    for (let i = 0; i < disk.length; i++) {
        if (i % 2 === 0) {
            const blocks = disk[i];
            for (let j = 0; j < blocks; j++) {
                expanded[pos] = id;
                pos++;
            }
            id++;
        } else {
            pos += disk[i];
        }
    }

    return expanded;
};

/**
 * 
 * @param {Buffer} input 
 */
const day9_1 = (input) => {
    // treat -1 as free space
    const disk = createDisk(input);

    // do swaps
    for (let i = disk.length - 1; i > 0; i--) {
        if (disk[i] > -1) {
            let free = disk.indexOf(-1);
            disk[free] = disk[i];
            disk[i] = -1;

            // moved all the blocks
            if (i === disk.indexOf(-1)) break;
        }
    }

    // calculate checksum
    let total = disk.filter((x) => x > -1).map((v, i) => v * i).reduce((a, b) => a + b);

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day9_2 = (input) => {
    // treat -1 as free space
    const disk = createDisk(input);

    // start with right most id
    let id = disk[0];
    for (let i = 0; i < disk.length; i++) {
        if (disk[i] > id) id = disk[i];
    }

    // do swaps
    while (id > 0) {
        // get block span
        const blockStart = disk.indexOf(id);
        const blockLen = disk.filter((x) => x === id).length;

        // get left most free span
        // probably a better way to do this
        let freeStart = disk.indexOf(-1);
        let freeLen = 0;
        for (let i = freeStart; i < blockStart; i++) {
            if (disk[i] === -1) {
                freeLen++;
            } else {
                // found block that can fit
                if (blockLen <= freeLen) {
                    break;
                } else {
                    // find next block
                    i = disk.indexOf(-1, i);
                    freeStart = i;
                    freeLen = 1;
                }
            }
        }

        if (blockLen <= freeLen) {
            for (let i = freeStart;i< freeStart + blockLen;i++){
                disk[i] = id;
            }
            for (let i = blockStart;i < blockStart + blockLen;i++){
                disk[i] = -1;
            }
        } 
        id--;
    }

    // calculate checksum
    let total = disk.map((v,i) => v > -1 ? v * i : 0).reduce((a,b) => a + b);

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day9 = (input) => {
    day9_1(input);
    day9_2(input);
};

module.exports = {
    day9
};
