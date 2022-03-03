namespace HelloWorld; 

public class Board {
	public readonly Cell[,] Cells;

	public readonly int rows;
	public readonly int cols;

	public Board(int rows, int cols, double density = .1, int seed = 1) {
		if (rows <= 0 || cols <= 0)
			throw new ArgumentException("Row or size was smaller than 1");

		this.rows = rows;
		this.cols = cols;
		
		Cells = new Cell[rows, cols];
		for (int row = 0; row < rows; row++) {
			for (int col = 0; col < cols; col++) {
				Cells[row, col] = new Cell();
			}
		}

		PlaceRandom(density, seed);
		LinkNeighbours();
	}

	private void PlaceRandom(double density, int seed) {
		Random random = new Random(seed);
		foreach (Cell cell in Cells)
			cell.IsAlive = random.NextDouble() < density;
	}

	public void Step() {
		// Calculate state for next step
		foreach(Cell cell in Cells)
			cell.CalculateNextState();
		
		// Do step for cell
		foreach (Cell cell in Cells)
			cell.Step();
	}

	private void LinkNeighbours() {
		/*
		 * rT, cL	| rT, col	| rT, cR
		 * row, cL	| row, col	| row, cR
		 * rB, cL	| rB, col	| rB, cR
		 */
		for (int row = 0; row < rows; row++) {
			for (int col = 0; col < cols; col++) {
				// Get positions for X/Y-Left/Right but keeping in mind that Cells might be at the edge
				
				// Row Top and Row Bottom
				int rT = (row > 0) ? row - 1 : -1;
				int rB = (row < rows - 1) ? row + 1 : -1;
				
				// Col Left and Right
				int cL = (col > 0) ? col - 1 : -1;
				int cR = (col < cols - 1) ? col + 1 : -1;
				
				Cells[row, col].AddNeighbours(row, col, rT, rB, cL, cR, Cells);
			}
		}
	}

	public void Draw() {
		//Console.Clear();
		Console.SetCursorPosition(0,0);
		for (int row = 0; row < rows; row++) {
			for (int col = 0; col < cols; col++) {
				Cells[row,col].Draw();
				Console.Write(" ");
			}
			Console.WriteLine();
		}
	}
}