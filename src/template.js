const fs = require('fs');

const src = '.' + process.argv[1].substring(process.cwd().length);
args = process.argv.slice(2);
if (args.length != 1) {
    console.error(`Usage: node ${src} <day>`);
    process.exit(99);
}

let day;
try {
    day = parseInt(args[0]);
} catch(error) {
    console.error(error.message);
    console.error(`Usage: node ${src} <day>`);
    process.exit(99);
}
const template = `
/**
 * 
 * @param {Buffer} input 
 */
const day${day}_1 = (input) => {
    let total = 0;

    console.log(\`Answer: \${total}\`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day${day}_2 = (input) => {
    let total = 0;

    console.log(\`Answer: \${total}\`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day${day} = (input) => {
    day${day}_1(input);
    day${day}_2(input);
};

module.exports = {
    day${day}
};
`;

fs.writeFileSync(`./src/day${day}.js`, template);
if (!fs.existsSync('./inputs')) {
    fs.mkdirSync('./inputs');
}
fs.writeFileSync(`./inputs/day${day}.txt`,'');
