namespace HelloWorld;

public class Cell {
	public bool IsAlive { get; set; }
	private bool IsAliveNext;
	public readonly List<Cell> neighbours = new List<Cell>();

	public void CalculateNextState() {
		int aliveNeighbours = neighbours.Where(n => n.IsAlive).Count();

		// When Cell is alive and has less than two or more than three living neighbours, it dies
		// When a Cell is dead and has exactly three neighbours it comes alive
		if (IsAlive)
			IsAliveNext = aliveNeighbours == 2 || aliveNeighbours == 3;
		else
			IsAliveNext = aliveNeighbours == 3;
	}

	public void Step() {
		IsAlive = IsAliveNext;
	}

	public void AddNeighbours(int row, int col, int rT, int rB, int cL, int cR, Cell[,] cells) {
		/*
		 * rT, cL	| rT, col	| rT, cR
		 * row, cL	| row, col	| row, cR
		 * rB, cL	| rB, col	| rB, cR
		 */
		
		if(rT != -1 && cL != -1)
			neighbours.Add(cells[rT, cL]);
		if(rT != -1 && cR != -1)
			neighbours.Add(cells[rT, cR]);
		if (rT != -1)
			neighbours.Add(cells[rT, col]);
			
		
		if (cL != -1)
			neighbours.Add(cells[row, cL]);
		if (cR != -1)
			neighbours.Add(cells[row, cR]);
		
		if(rB != -1 && cL != -1)
			neighbours.Add(cells[rB, cL]);
		if(rB != -1 && cR != -1)
			neighbours.Add(cells[rB, cR]);
		if (rB != -1)
			neighbours.Add(cells[rB, col]);
	}

	public void Draw() {
		if(IsAlive)
			Console.Write('■');
		else
			Console.Write('□');
	}
}