package cell

import "fmt"

// Starting with capital letter --> Public
// Starting with lowercase letter --> Private

type Cell struct {

	// Public
	IsAlive    bool
	HasChanged bool

	// Private
	isAliveNext bool
}

// Think of it as a constructor but as a separate function
func New(isAlive bool) Cell {
	c := Cell{
		IsAlive:     isAlive,
		HasChanged:  true,
		isAliveNext: isAlive,
	}

	return c
}

// (c Cell) is the receiver, this means that you "call" this function on a Cell-type object
func (c *Cell) CalculateNextStep(aliveNeighbours byte) {
	if c.IsAlive {
		c.isAliveNext = aliveNeighbours == 2 || aliveNeighbours == 3
	} else {
		c.isAliveNext = aliveNeighbours == 3
	}

	if c.IsAlive != c.isAliveNext {
		c.HasChanged = true
	}
}

func (c *Cell) Step() {
	c.IsAlive = c.isAliveNext
}

func (c *Cell) Hello() {
	fmt.Println("Hello, world. I'm a cell. Am I currently alive? ", c.IsAlive)
}

func (c Cell) Draw() {
	if c.IsAlive {
		fmt.Print("■")
	} else {
		fmt.Print("□")
	}
}
