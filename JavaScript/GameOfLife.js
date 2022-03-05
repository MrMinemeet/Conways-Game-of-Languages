class Cell {
    isAlive = false;
    isAliveNext = false;

    neighbours = []

    constructor(alive) {
        this.isAlive = alive;
    }

    addNeighbour(row, col, rT, rB, cL, cR, cells) {
		
		if(rT != -1 && cL != -1)
			neighbours.Add(cells[rT, cL]);
		if(rT != -1 && cR != -1)
			neighbours.Add(cells[rT, cR]);
		if (rT != -1)
			neighbours.Add(cells[rT, col]);
			
		
		if (cL != -1)
			neighbours.Add(cells[row, cL]);
		if (cR != -1)
			neighbours.Add(cells[row, cR]);
		

		if(rB != -1 && cL != -1)
			neighbours.Add(cells[rB, cL]);
		if(rB != -1 && cR != -1)
			neighbours.Add(cells[rB, cR]);
		if (rB != -1)
			neighbours.Add(cells[rB, col]);
    }

    calculateNextState() {
        let aliveNeighbours = 0;

        for (let neighbour of this.neighbours) {
            if (neighbour.alive) {
                aliveNeighbours++;
            }
        }

        if(this.isAlive) {
            this.isAliveNext = aliveNeighbours == 2 || aliveNeighbours == 3;
        } else {
            this.isAliveNext = aliveNeighbours == 3;
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
    }

    linkNeighbours() {
		/*
		 * rT, cL	| rT, col	| rT, cR
		 * row, cL	| row, col	| row, cR
		 * rB, cL	| rB, col	| rB, cR
		 */
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                let rT = (row > 0) ? row - 1 : -1;
                let rB = (row < this.rows - 1) ? row + 1 : -1;
        
                let cL = (col > 0) ? col - 1 : - 1;
                let cR = (col < cols - 1) ? row + 1 : -1;

                cells[row][col].addNeighbour(row, col, rT, rB, cL, rB, cells);
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
}




let board = new Board(10, 10, .3, Math.random(0, 100));
//console.table(board.cells);
console.clear();
board.draw();

//while(true) {
    setInterval(() => {
        board.draw();
        board.step();    
    },1000);
//}