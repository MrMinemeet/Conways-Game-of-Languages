package main

import (
	"CGoL/board"
	tm "github.com/buger/goterm" // Advanced terminal manipulation
	"os"
	"time"
	"strconv"
)

const WAIT_TIME_MS int = 300

func main() {
	argsWithoutProg := os.Args[1:]
	
	height, _ := strconv.Atoi(argsWithoutProg[0])
	width, _ := strconv.Atoi(argsWithoutProg[1])

	b := board.New(height, width)

	tm.Clear()
	tm.MoveCursor(1, 1)
	b.Draw(true)
	tm.Flush()

	for true {
		tm.MoveCursor(1, 1) // Move cursor to the top left corner
		b.Draw(false)
		tm.Flush()

		b.Step()
		time.Sleep(time.Millisecond * time.Duration(WAIT_TIME_MS))
	}
}
