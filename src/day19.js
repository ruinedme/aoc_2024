let patterns, designs;

const isValid = (design) => {
    // On the off chance a design doesn't contain the missing color we can just add it
    // if (!design.includes(missing)) return true;
    let offset = 0;
    let backtracks = 0;
    inner: while (offset < design.length && backtracks < 10) {
        const toCheck = patterns.filter((x) => x.startsWith(design.substring(offset, offset + 1)));
        let found = false;
        toCheck.forEach((pattern) => {
            const sub = design.substring(offset, offset + pattern.length);
            if (sub === pattern) {
                offset += pattern.length;
                found = true;
            }
        });

        if (!found) {
            backtracks++;
            offset--;
            if(!isValid(design.substring(0,offset))) return false;
        }
    }

    return design.length === offset;
}

/**
 * 
 * @param {Buffer} input 
 */
const day19_1 = (input) => {
    const lines = input.toString().split('\r\n\r\n');
    patterns = lines[0].split(', ').sort((a, b) => b.length - a.length);
    designs = lines[1].split('\r\n');

    let total = 0;
    designs.forEach((x) => isValid(x) ? total++ : 0);

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day19_2 = (input) => {
    let total = 0;

    designs.forEach((design) => {
        if (isValid(design)){
            // How many combinations are there?
            toCheck = patterns.filter((x) => design.includes(x));
            console.log(design, toCheck);
        }
    });

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day19 = (input) => {
    day19_1(input);
    day19_2(input);
};

module.exports = {
    day19
};
