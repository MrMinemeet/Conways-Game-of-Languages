import random
import os
import time

class Cell:
    def __init__(self, isAlive):
        self.alive = isAlive
        self.isAliveNext = False

        self.neighbours = []

    def calculateNextState(self):
        # Count alive neighbours
        aliveNeighbours = 0
        for neighbour in self.neighbours:
            if neighbour.alive:
                aliveNeighbours += 1

        if(self.alive):
            self.isAliveNext = aliveNeighbours == 2 or aliveNeighbours == 3
        else:
            self.isAliveNext = aliveNeighbours == 3

    def step(self):
        self.alive = self.isAliveNext

    def draw(self):
        if(self.alive):
            print("😀", end="")
        else:
            print("💀", end="")

    def addNeighbours(self, row, col, rT, rB, cL, cR, cells):
        if rT != -1 and cL != -1:
            self.neighbours.append(cells[rT][cL])
        if rT != -1 and cR != -1:
            self.neighbours.append(cells[rT][cR])
        if rT != -1:
            self.neighbours.append(cells[rT][col])

        if cL != -1:
            self.neighbours.append(cells[row][cL])
        if cR != -1:
            self.neighbours.append(cells[row][cR])

        if rB != -1 and cL != -1:
            self.neighbours.append(cells[rB][cL])
        if rB != -1 and cR != -1:
            self.neighbours.append(cells[rB][cR])
        if rB != -1:
            self.neighbours.append(cells[rB][col])




class Board:
    def __init__(self, rows, cols, density = .1, seed = 1):
        self.rows = rows
        self.cols = cols

        self.cells = [[Cell(False) for col in range(self.cols)] for row in range(self.rows)]

        self.placeRandom(density, seed)
        self.linkNeighbours()

    
    def placeRandom(self, density, seed):
        random.seed(seed)
        for row in range(self.rows):
            for col in range(self.cols):
                if random.random() < density:
                    self.cells[row][col] = Cell(True)
                else:
                    self.cells[row][col] = Cell(False)

    def linkNeighbours(self):
		# rT, cL	| rT, col	| rT, cR
		# row, cL	| row, col	| row, cR
		# rB, cL	| rB, col	| rB, cR

        for row in range(self.rows):
            for col in range(self.cols):
                # Row Top and Row Bottom
                rT = rB = -1

                if row > 0:
                    rT = row - 1
                if row < self.rows - 1:
                    rB = row + 1

                # Col Left and Col Right
                cL = cR = -1
                if col > 0:
                    cL = col - 1
                if col < self.cols - 1:
                    cR = col + 1

                self.cells[row][col].addNeighbours(row, col, rT, rB, cL, cR, self.cells)


    def Step(self):
        for row in range(self.rows):
            for col in range(self.cols):
                self.cells[row][col].calculateNextState()
        
        for row in range(self.rows):
            for col in range(self.cols):
                self.cells[row][col].step()

    def draw(self):
        os.system("clear")
        for row in range(self.rows):
            for col in range(self.cols):
                self.cells[row][col].draw()
            print()

    def allDead(self):
        for row in range(self.rows):
            for col in range(self.cols):
                if self.cells[row][col].alive:
                    return False
        return True









def main():
    board = Board(40, 40, .3, random.randint(0, 100))
    os.system("clear")
    
    while(True):
        board.draw()
        if(board.allDead()):
            print("All dead")
            exit()

        board.Step()
        time.sleep(.1)






# Call main function
if __name__ == "__main__":
    main()