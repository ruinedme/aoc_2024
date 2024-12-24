const fs = require('fs');
const days = require('./days');

const src = '.' + process.argv[1].substring(process.cwd().length);
args = process.argv.slice(2);
if (args.length != 1) {
    console.error(`Usage: node ${src} <day>`);
    process.exit(99);
}

let day,file;
try {
    day = parseInt(args[0]);
    file = fs.readFileSync(`./inputs/day${day}.txt`);
} catch(error) {
    console.error(error.message);
    console.error(`Usage: node ${src} <day>`);
    process.exit(99);
}

switch(day){
    case 1:
        days.day1(file);
        break;
    case 2:
        days.day2(file);
        break;
    case 3:
        days.day3(file);
        break;
    case 4:
        days.day4(file);
        break;
    case 5:
        days.day5(file);
        break;
    case 6:
        days.day6(file);
        break;
    case 7:
        days.day7(file);
        break;
    case 8:
        days.day8(file);
        break;
    case 9:
        days.day9(file);
        break;
    case 10:
        days.day10(file);
        break;
    case 11:
        days.day11(file);
        break;
    case 12:
        days.day12(file);
        break;
    case 13:
        days.day13(file);
        break;
    case 14:
        days.day14(file);
        break;
    case 15:
        days.day15(file);
        break;
    case 16:
        days.day16(file);
        break;
    case 17:
        days.day17(file);
        break;
    case 18:
        days.day18(file);
        break;
    case 19:
        days.day19(file);
        break;
    case 20:
        days.day20(file);
        break;
    case 21:
        days.day21(file);
        break;
    case 22:
        days.day22(file);
        break;
    case 23:
        days.day23(file);
        break;
    case 24:
        days.day24(file);
        break;
    // case 25:
    //     days.day25(file);
    //     break;
    default:
        console.error('Invalid Day: ', day);
}
