class Cell {
    isAlive = false;
    isAliveNext = false;

    neighbours = []

    constructor(alive) {
        this.isAlive = alive;
    }

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

    step() {
        this.isAlive = this.isAliveNext;
    }


    draw() {
        process.stdout.write(this.isAlive ? "😀" : "💀")
    }
}

class Board {
    rows = 0;
    cols = 0;

    cells;

    constructor(rows, cols, density = .1, seed = 1) {
        this.rows = rows;
        this.cols = cols;

        this.cells = new Array(rows).fill(0).map(() => new Array(cols).fill(0).map(() => new Cell(false)));

        this.placeRandom(density, seed);
        this.linkNeighbours();
    }

    linkNeighbours() {
		/*
		 * rT, cL	| rT, col	| rT, cR
		 * row, cL	| row, col	| row, cR
		 * rB, cL	| rB, col	| rB, cR
		 */
        for(let row = 0; row < this.rows; row++) {
            for(let col = 0; col < this.cols; col++) {
                let rT = (row > 0) ? row - 1 : -1;
                let rB = (row < this.rows - 1) ? row + 1 : -1;
        
                let cL = (col > 0) ? col - 1 : - 1;
                let cR = (col < this.cols - 1) ? row + 1 : -1;

                this.cells[row][col].addNeighbour(row, col, rT, rB, cL, rB, this.cells);
            }
        }


    }

    placeRandom(density, seed) {
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                let randVal = Math.random();
                this.cells[i][j].isAlive = randVal < density;
            }
        }
    }

    step() {
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                this.cells[i][j].calculateNextState();
            }
        }

        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                this.cells[i][j].step();
            }
        }
    }

    draw() {
        console.clear();
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                this.cells[i][j].draw();
            }
            console.log();
        }
    }

    allDead() {
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                if(this.cells[i][j].isAlive) {
                    return false;
                }
            }
        }

        return true;
    }
}




let board = new Board(40, 40, .3, Math.random(0, 100));
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