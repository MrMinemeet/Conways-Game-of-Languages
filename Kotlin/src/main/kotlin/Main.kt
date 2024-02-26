fun main() {
	val board = Board(10,10)

	while(!board.isAtEnd()) {
		println(board)
		board.step()
		Thread.sleep(100)
	}
	println(board)

	println("All cells died :(")
}