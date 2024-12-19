const { Grid } = require("./utils/grid");

const WALL = '#'.charCodeAt(0);

const parseByte = (G, b) => {
    const coords = b.split(',');
    const x = parseInt(coords[0]);
    const y = parseInt(coords[1]);
    const index = G.getIndex(y, x);

    return index;
}

const parseInput = (input) => {
    const lines = input.toString().split('\r\n');
    const gridSize = 71;
    // disgusting. Better way to do this?
    const temp = new Array(gridSize * gridSize).fill('.').join('');
    const map = new Grid(Buffer.from(temp));
    map.height = gridSize;
    map.width = gridSize;
    const end = map.getIndex(gridSize - 1, gridSize - 1);
    for (let i = 0; i < 1024; i++) {
        const index = parseByte(map, lines[i]);
        map.grid[index] = '#'.charCodeAt(0);
    }

    return { map, bytes: lines };
};

/**
 * 
 * @param {Grid} G 
 * @param {number} root 
 * @param {number} goal 
 */
const dijkstra = (G, root, goal) => {
    // Create Set of unvisted nodes
    const unvisited = new Array(G.grid.length);
    const visted = [];
    G.grid.forEach((_v, i) => {
        unvisited[i] = { node: i, distance: unvisited.length + 1 }
    });
    // Set root to 0
    unvisited[root].distance = 0;
    // Select Starting Node with the smallest (finite) distance
    let current = unvisited[root];
    while (unvisited.length > 0 && current.distance < unvisited.length + 1) {
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
        visted.push(current);
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
            visted.push(current);
            break;
        }
    }

    return visted;
};

/**
 * 
 * @param {Buffer} input 
 */
const day18_1 = (input) => {
    const { map } = parseInput(input);
    const goal = map.getIndex(70, 70);
    const path = dijkstra(map, 0, goal);

    const total = path.filter((x) => x.node === goal)[0].distance;
    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day18_2 = (input) => {
    const { map, bytes } = parseInput(input);
    const goal = map.getIndex(70, 70);
    let total = 0;
    for (let i = 1024; i < bytes.length; i++) {
        const byteIndex = parseByte(map, bytes[i]);
        map.grid[byteIndex] = '#'.charCodeAt(0);
        const path = dijkstra(map, 0, goal).filter((x) => x.node === goal);
        if (path.length === 0) {
            total = bytes[i];
            break;
        }
    }

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day18 = (input) => {
    day18_1(input);
    day18_2(input);
};

module.exports = {
    day18
};
