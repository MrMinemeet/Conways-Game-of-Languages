class Cell(var isAlive: Boolean = false) {
	private var isAliveNext = false
	private val neighbors: Array<Cell?> = Array(8) { null }

	/**
	 * Calculate the next state of this cell.
	 * The next state is calculated based on the number of alive neighbors as by the following rules:
	 * 1. Any live cell with fewer than two live neighbors dies, as if by underpopulation.
	 * 2. Any live cell with two or three live neighbors lives on to the next generation.
	 * 3. Any live cell with more than three live neighbors dies, as if by overpopulation.
	 * 4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
	 */
	fun calculateNextStep() {
		val aliveNeighbors = neighbors.count { it?.isAlive ?: false }
		isAliveNext = if(isAlive) aliveNeighbors in 2..3 else aliveNeighbors == 3
	}

	/**
	 * Set the neighbors of this cell. Only the first 8 neighbors will be set.
	 * @param n1 The first neighbor
	 * @param cells The rest of the neighbors
	 */
	fun setNeighbors(n1: Cell, vararg cells: Cell) =
		arrayOf(n1, *cells).take(8).forEachIndexed { index, cell ->  neighbors[index] = cell }

	/**
	 * Calculate the next step of this cell
	 * @return The next state of this cell
	 */
	fun step() {
		isAlive = isAliveNext
	}

	override fun toString() = if(isAlive) "😀" else "💀"
}