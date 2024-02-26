import kotlin.random.Random

class Board (rows: Int, cols: Int, density: Float = 0.1f, seed: Int = 1) {
	private val cells: Array<Array<Cell>>
	init {
		val random = Random(seed)
		cells = Array(rows) { Array(cols) { Cell(random.nextFloat() < density) } }

		// Add neighbor references to cells
		addNeighbors()
	}

	/**
	 * Set the neighbors of the cells in the board.
	 * The neighbors are set in a clockwise manner starting from the top left corner.
	 */
	fun step() {
		cells.forEach { row -> row.forEach { it.calculateNextStep() } }
		cells.forEach { row -> row.forEach { it.step() } }
	}

	override fun toString(): String {
		val sb = StringBuilder()
		cells.forEach { row ->
			row.forEach { sb.append(" $it") }
			sb.append("\n")
		}
		return sb.toString()
	}

	/**
	 * Check if the board has reached a state where all cells are dead.
	 * @return True if all cells are dead, false otherwise
	 */
	fun isAtEnd(): Boolean {
		return cells.all { row -> row.all { !it.isAlive } }
	}

	/**
	 * Add neighbor references to the cells in the board.
	 */
	private fun addNeighbors() {
		// For each cell
		for (cellRow in cells.indices) {
			for (cellCol in cells[cellRow].indices) {
				val neighbors = mutableListOf<Cell>()
				// Go through each neighbor-offset
				for (rowOffset in -1..1) {
					for (colOffset in -1..1) {
						val neighborRow = cellRow + rowOffset
						val neighborCol = cellCol + colOffset
						// If the neighbor is within the bounds of the board and not the cell itself
						if (!(rowOffset == 0 && colOffset == 0) &&
							neighborRow in cells.indices &&
							neighborCol in cells[cellRow].indices)
						{
							neighbors.add(cells[neighborRow][neighborCol])
						}
					}
				}
				// Set the neighbors of the cell
				cells[cellRow][cellCol].setNeighbors(neighbors[0], *neighbors.drop(1).toTypedArray())
			}
		}
	}
}