
/**
 * 
 * @param {Buffer} input 
 */
const day5_1 = (input) => {
    let total = 0;
    const { rules, updates } = parseInput(input);

    updates.forEach((update) => {
        let isCorrect = true;
        rules.forEach((rule) => {
            const order = rule.split('|');
            const first = update.indexOf(order[0]);
            const second = update.indexOf(order[1]);

            if ((first !== -1 && second !== -1) && (second < first)) {
                isCorrect = false;
            }
        });

        if (isCorrect) {
            const pages = update.split(',');
            const middle = Math.floor(pages.length / 2);
            total += parseInt(pages[middle]);
        }
    });
    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day5_2 = (input) => {
    let total = 0;
    const { rules: r, updates: u } = parseInput(input);
    
    const updates = [];
    const rules = [];
    // split all the arrays into sub arrays so we only have to split them the 1 time
    // initial solution was spliting on each iteration
    u.forEach((v) => { updates.push(v.split(','))});
    // added sort for rules as this seems to reduce the number of iterations each update needs to do.
    r.sort().forEach((v) => {rules.push(v.split('|'))});
    
    updates.forEach((update) => {
        let isCorrect = true;
        for (let i = 0; i < rules.length; i++) {
            const order = rules[i];
            const first = update.indexOf(order[0]);
            const second = update.indexOf(order[1]);

            if ((first !== -1 && second !== -1) && (second < first)) {
                const v1 = update[first];
                const v2 = update[second];
                update[first] = v2;
                update[second] = v1;

                isCorrect = false;
                // reset to make sure all rules are still enforced
                i = 0;
            }
        }

        if (!isCorrect) {
            const middle = Math.floor(update.length / 2);
            total += parseInt(update[middle]);
        }
    });
    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day5 = (input) => {
    day5_1(input);
    day5_2(input);
};

const parseInput = (input) => {
    const lines = input.toString().split('\r\n');
    const EOR = lines.indexOf('');
    const rules = lines.slice(0, EOR);
    const updates = lines.slice(EOR + 1);

    return { rules, updates };
};

module.exports = {
    day5
};
