// @ts-check

// Copyright (c) 2022-2025 Alexander Voglsperger.
// This code is licensed under the MIT license.

class Cell {
    isAlive = false;
    isAliveNext = false;

    neighbours;

    /**
     * Creates a new cell with the given state.
     * @param {boolean} alive True if the cell is alive
     */
    constructor(alive) {
        this.isAlive = alive;
    }

    /**
     * Adds neighbours to the cell.
     * @param {number} row The row of the cell
     * @param {number} col The column of the cell
     * @param {number} rT The row of top neighbours
     * @param {number} rB The row of bottom neighbours
     * @param {number} cL The column of left neighbours
     * @param {number} cR The column of right neighbours
     * @param {Cell[][]} cells All the cells in the board
     */
    addNeighbour(row, col, rT, rB, cL, cR, cells) {
		if(rT != -1 && cL != -1) {
            this.neighbours.push(cells[rT][cL]);
        }
		if(rT != -1 && cR != -1) {
            this.neighbours.push(cells[rT][cR]);
        }
		if (rT != -1) {
            this.neighbours.push(cells[rT][col]);
        }
			
		
		if (cL != -1) {
			this.neighbours.push(cells[row][cL]);
        }
		if (cR != -1) {
			this.neighbours.push(cells[row][cR]);
        }


		if(rB != -1 && cL != -1) {
            this.neighbours.push(cells[rB][cL]);
        }
		if(rB != -1 && cR != -1) {
            this.neighbours.push(cells[rB][cR]);
        }
		if (rB != -1) {
            this.neighbours.push(cells[rB][col]);
        }
    }

    /**
     * Calculates the next state of the cell.
     * This is done by counting the alive neighbours and applying the rules of the game.
     */
    calculateNextState() {
        let aliveNeighbours = 0;

        for (let neighbour of this.neighbours) {
            if (neighbour.isAlive) {
                aliveNeighbours++;
            }
        }

        if(this.isAlive) {
            this.isAliveNext = (aliveNeighbours == 2 || aliveNeighbours == 3);
        } else {
            this.isAliveNext = (aliveNeighbours == 3);
        }
    }

    /**
     * Steps the cell to the next state.
     */
    step() {
        this.isAlive = this.isAliveNext;
    }

    /**
     * Draws the cell to the console.
     */
    draw() {
        process.stdout.write(this.isAlive ? "😀" : "💀")
    }
}

class Board {
    _rows = 0;
    _cols = 0;
    _cells;

    /**
     * Creates a new board with the given dimensions and density.
     * @param {number} rows Amount of rows
     * @param {number} cols Amount of columns
     * @param {number} density Density of alive cells in percent
     * @param {number} seed Seed for random number generation
     */
    constructor(rows, cols, density = .1, seed = 1) {
        this._rows = rows;
        this._cols = cols;

        this._cells = new Array(rows).fill(0).map(() => new Array(cols).fill(0).map(() => new Cell(false)));

        this.placeRandom(density, seed);
        this.linkNeighbours();
    }

    /**
     * Links all cells to their neighbours.
     */
    linkNeighbours() {
		/*
		 * rT, cL	| rT, col	| rT, cR
		 * row, cL	| row, col	| row, cR
		 * rB, cL	| rB, col	| rB, cR
		 */
        for(let row = 0; row < this._rows; row++) {
            for(let col = 0; col < this._cols; col++) {
                let rT = (row > 0) ? row - 1 : -1;
                let rB = (row < this._rows - 1) ? row + 1 : -1;
        
                let cL = (col > 0) ? col - 1 : - 1;
                let cR = (col < this._cols - 1) ? row + 1 : -1;

                this._cells[row][col].addNeighbour(row, col, rT, rB, cL, rB, this._cells);
            }
        }
    }

    /**
     * Places random cells on the board with the given density.
     * @param {number} density Density of alive cells in percent
     * @param {number} seed Seed for random number generation
     */
    placeRandom(density, seed) {
        for(let i = 0; i < this._rows; i++) {
            for(let j = 0; j < this._cols; j++) {
                // TODO: Use the seed to generate a random number
                let randVal = Math.random();
                this._cells[i][j].isAlive = randVal < density;
            }
        }
    }

    /**
     * Steps the board one generation forward.
     * This means that all cells calculate their next state and then step to the next state.
     */
    step() {
        for(let i = 0; i < this._rows; i++) {
            for(let j = 0; j < this._cols; j++) {
                this._cells[i][j].calculateNextState();
            }
        }

        for(let i = 0; i < this._rows; i++) {
            for(let j = 0; j < this._cols; j++) {
                this._cells[i][j].step();
            }
        }
    }

    /**
     * Draws the board to the console.
     */
    draw() {
        console.clear();
        for(let i = 0; i < this._rows; i++) {
            for(let j = 0; j < this._cols; j++) {
                this._cells[i][j].draw();
            }
            console.log();
        }
    }

    /**
     * Checks if all cells are dead, which means the game can be stopped.
     * @returns {boolean} True if all cells are dead
     */
    allDead() {
        for(let i = 0; i < this._rows; i++) {
            for(let j = 0; j < this._cols; j++) {
                if(this._cells[i][j].isAlive) {
                    return false;
                }
            }
        }

        return true;
    }
}

function main() {
    const board = new Board(40, 40, .3, Math.random() * 1000);
    //console.table(board.cells);
    console.clear();
    
    setInterval(() => {
        board.draw();
        if(board.allDead()) {
            console.log("All dead");
            process.exit();
        }
    
        board.step(); 
    }, 100);
}

main();