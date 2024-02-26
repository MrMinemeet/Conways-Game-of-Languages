package org.example

import kotlin.random.Random

class Board (rows: Int, cols: Int, density: Float = 0.1f, seed: Int = 1) {
	private val cells: Array<Array<Cell>>
	init {
		val random = Random(seed)
		cells = Array(rows) { Array(cols) { Cell(random.nextFloat() < density) } }

		// TODO: Add neighbor references to cells

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
}