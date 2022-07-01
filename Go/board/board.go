package board

import (
	"CGoL/cell"
	"fmt"
	"math/rand"

	tm "github.com/buger/goterm" // Advanced terminal manipulation
)

type Board struct {
	Cells [][]cell.Cell

	rows int
	cols int
}

func New(rows int, cols int) Board {
	b := Board{
		Cells: makeCells(rows, cols),
		rows:  rows,
		cols:  cols,
	}

	b.placeRandom(0.3, 1)

	return b
}

func (b Board) Step() {
	for row := 0; row < b.rows; row++ {
		for col := 0; col < b.cols; col++ {
			aliveNeighbours := b.getAliveNeighbours(row, col)
			b.Cells[row][col].CalculateNextStep(aliveNeighbours)
		}
	}

	for row := 0; row < b.rows; row++ {
		for col := 0; col < b.cols; col++ {
			b.Cells[row][col].Step()
		}
	}
}

func (b Board) Draw(fullDraw bool) {
	//fullDraw = true // TODO: Partial drawing needs fixing
	for row := 0; row < b.rows; row++ {
		for col := 0; col < b.cols; col++ {
			if fullDraw {
				b.Cells[row][col].Draw()
			} else if b.Cells[row][col].HasChanged {
				tm.MoveCursor(col * 2 + 1, row + 1)
				tm.Flush()
				b.Cells[row][col].Draw()
			}
			fmt.Print(" ")
		}
		fmt.Println()
		tm.Flush()
	}
}

func makeCells(rows int, cols int) [][]cell.Cell {
	cells := make([][]cell.Cell, rows)

	for i := 0; i < rows; i++ {
		cells[i] = make([]cell.Cell, cols)
	}

	return cells
}

func (b Board) placeRandom(density float32, seed int64) {
	r := rand.New(rand.NewSource(seed))

	for row := 0; row < b.rows; row++ {
		for col := 0; col < b.cols; col++ {
			if r.Float32() < density {
				b.Cells[row][col] = cell.New(true)
			}
		}
	}

}

func (b Board) getAliveNeighbours(row int, col int) byte {
	var aliveNeighbours byte = 0

	for i := -1; i <= 1; i++ {
		for j := -1; j <= 1; j++ {
			if i == 0 && j == 0 {
				// Current cell cannot be neighbour of itself
				continue
			}

			neighbourRow := row + i
			neighbourCol := col + j

			if neighbourRow < 0 || neighbourRow >= b.rows ||
				neighbourCol < 0 || neighbourCol >= b.cols {
				// Cell is out of bounds
				continue
			}

			if b.Cells[neighbourRow][neighbourCol].IsAlive {
				aliveNeighbours++
			}
		}
	}

	return aliveNeighbours
}
