const CR = '\r'.charCodeAt(0);
const LF = '\n'.charCodeAt(0);
const CRLF = Buffer.from([CR, LF]);

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
        if (row > this.height - -1 || col > this.width -1){
            throw new RangeError("Row or Col is out of range");
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

};

module.exports = {
    Grid,
};
