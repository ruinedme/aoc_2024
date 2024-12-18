const { Grid } = require("./utils/grid");

const WALL = '#'.charCodeAt(0);

const Direction = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3,
};

/**
 * 
 * @param {Grid} G 
 * @param {*} root 
 * @param {string} goal 
 * @returns 
 */
const BFS = (G, root, goal) => {
    const explored = new Set();
    const path = [];
    const target = goal.split(':');
    explored.add(root);
    const Q = [];
    Q.push(root);

    while (Q.length > 0) {
        const v = Q.pop().split(':');
        
        if (v[0] === target[0]) {
            path.forEach((x) => {
                console.log(x);
            });

            return explored;
        }
        G.getCardinalNeighbors(v[0]).forEach((w,i) => {
            const node = `${w}:${i}`;
            if (G.grid[w] !== WALL && !explored.has(node)) {
                explored.add(node);
                // w.parent := v
                // console.log(`${String.fromCharCode(G.grid[w])}`);
                // path.set(node,`${v[0]}:${v[1]}`);
                path.push({k :`${v[0]}:${v[1]}`, v: `${node}`});
                Q.push(node);
            }
        });
    }
};

/**
 * 
 * @param {Buffer} input 
 */
const day16_1 = (input) => {
    const map = new Grid(input);
    const start = map.grid.indexOf('S');
    const end = map.grid.indexOf('E');
    console.log(start, end);
    const nodes = BFS(map,`${start}:1`,`${end}:0`);
    nodes.forEach((v) => {
        const t = v.split(':');
        if (parseInt(t[0]) !== start && parseInt(t[0]) !== end) {
            switch (t[1]) {
                case '0':
                    map.grid[t[0]] = '^'.charCodeAt(0);        
                    break;
                case '1':
                    map.grid[t[0]] = '>'.charCodeAt(0);        
                    break;
                case '2':
                    map.grid[t[0]] = 'v'.charCodeAt(0);        
                    break;
                case '3':
                    map.grid[t[0]] = '<'.charCodeAt(0);        
                    break;
                default:
                    console.log('bad dir');
            }
            // map.grid[t[0]] = 'X'.charCodeAt(0);
        }
    });
    nodes.forEach((v) => {
        const t = v.split(':');
        console.log(v, map.getRowCol(t[0]), t[1]);
    });
    // console.log(nodes);
    map.display();
    let total = 0;

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day16_2 = (input) => {
    let total = 0;

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day16 = (input) => {
    day16_1(input);
    day16_2(input);
};

module.exports = {
    day16
};
