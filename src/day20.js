const { Grid } = require('./utils/grid');
const WALL = '#'.charCodeAt(0);
const START = 'S'.charCodeAt(0);
const END = 'E'.charCodeAt(0);

/**
 * 
 * @param {Grid} G 
 * @param {number} root 
 * @param {number} goal 
 */
const dijkstra = (G, root, goal) => {
    // Create Set of unvisted nodes
    const unvisited = new Array(G.grid.length);
    const visted = new Map();
    const unreachable = unvisited.length * 2;
    G.grid.forEach((_v, i) => {
        unvisited[i] = { node: i, distance: unreachable }
    });
    // Set root to 0
    unvisited[root].distance = 0;
    // Select Starting Node with the smallest (finite) distance
    let current = unvisited[root];
    while (unvisited.length > 0 && current.distance < unreachable) {
        const neighbors = G.getCardinalNeighbors(current.node);
        neighbors.forEach((v) => {
            if (G.grid[v] !== WALL) {
                const nodes = unvisited.filter((x) => x.node === v);
                if (nodes.length > 0) {
                    const distance = current.distance + 1;
                    if (distance < nodes[0].distance) {
                        nodes[0].distance = distance;
                    }
                }
            }
        });

        // This is where having a proper min-priroity queue would be helpful
        let index = -1;
        for (let i = 0; i < unvisited.length; i++) {
            if (unvisited[i].node === current.node) {
                index = i;
                break;
            }
        }
        // remove current node
        visted.set(current.node, current.distance);
        // visted.push(current);
        unvisited.splice(index, 1);

        // find next node
        if (unvisited.length === 0) {
            break;
        }
        current = unvisited[0];
        for (let i = 1; i < unvisited.length; i++) {
            if (unvisited[i].distance < current.distance) {
                current = unvisited[i];
            }
        }

        if (current.node === goal) {
            visted.set(current.node, current.distance);
            // visted.push(current);
            break;
        }
    }

    return visted;
};

/**
 * 
 * @param {Buffer} input 
 */
const day20_1 = (input) => {
    const map = new Grid(input);
    const start = map.grid.indexOf(START);
    const goal = map.grid.indexOf(END);
    const InitialTime = dijkstra(map,start,goal);
    // console.log(track);
    console.log(start, goal);
    InitialTime.forEach((v,k) => console.log(`${k} -> ${v}`));
    let total = 0;

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day20_2 = (input) => {
    let total = 0;

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day20 = (input) => {
    day20_1(input);
    day20_2(input);
};

module.exports = {
    day20
};
