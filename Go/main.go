package main

import (
	"CGoL/board"
	"fmt"
	tm "github.com/buger/goterm" // Advanced terminal manipulation
	"time"
)

const WAIT_TIME_MS int = 100

func main() {
	const width = 20
	const height = 20
	const seed = 100

	b := board.New(height, width, seed)

	tm.Clear()
	tm.MoveCursor(1, 1)
	tm.Flush()
	b.Draw(true)

	generation := 0
	for {
		tm.MoveCursor(1, 1) // Move cursor to the top left corner
		b.Draw(false)
		tm.Flush()

		if !b.DidAnyChange() {
			break
		}

		b.Step()
		generation++
		time.Sleep(time.Millisecond * time.Duration(WAIT_TIME_MS))
	}

	fmt.Printf("No more changes after %d generations\n", generation)
}
