const CR = '\r'.charCodeAt(0);
const LF = '\n'.charCodeAt(0);
const CRLF = Buffer.from([CR, LF]);

const Direction = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3,
};

/**
 * Helper class for working with grids
 */
class Grid {
    /**
     * 
     * @param {Buffer} buffer 
     */
    constructor(buffer) {
        /** @type number */
        this.width = buffer.indexOf(CRLF);
        if (this.width === -1) this.width = buffer.length;
        /** @type Buffer*/
        this.grid = buffer.filter((value) => value !== CR && value !== LF);
        /** @type number */
        this.height = Math.floor(this.grid.length / this.width);  
    }

    /**
     * 
     * @param {number} row 
     * @param {number} col 
     * @returns The index of the flattened grid
     * @throws RangeError
     */
    getIndex(row, col) {
        if (row > this.height || col > this.width -1){
            const err = `Row or Col is out of range: ${row}, ${col}`;
            throw new RangeError(err);
        }
        
        return this.width * row + col;
    }

    /**
     * 
     * @param {number} index 
     * @returns {{row: number, col: number}}the row, col of the grid from the given index
     * @throws RangeError
     */
    getRowCol(index) {
        if (index > this.grid.length - 1 || index < 0) {
            throw new RangeError("Index out of bounds");
        }
        const row = Math.floor(index / this.height);
        const col = index % this.width;
        return {row, col};
    }

    /**
     * 
     * @param {number} index 
     * @returns {[up: number, right: number, down: number, left: number]} Returns the indicies of the neighbors for given index. 
     * 
     * If no valid neighbor will return -1
     * 
     */
    getCardinalNeighbors(index) {
        console.log(`index: ${index}, ${this.width}, ${this.height}`);
        const {row, col} = this.getRowCol(index);
        console.log(`${row}, ${col}`);

        let up = -1;
        if (row > 0) up = this.getIndex(row -1, col);

        let right = -1;
        if (col < this.width - 1) right = this.getIndex(row, col+1);
        
        let down = -1;
        if (row < this.height -1) down = this.getIndex(row + 1, col);

        let left = -1;
        if (col > 0) left = this.getIndex(row, col -1);

        return [up, right, down, left];
    }

};

module.exports = {
    Grid,
    Direction
};
