using System.Diagnostics;

namespace HelloWorld
{
	class Program
	{
		static void Main(string[] args) {
			int rows = int.Parse(args[0]);
			int cols = int.Parse(args[1]);
			
			Board board = new Board(rows, cols, 0.3, new Random().Next());
			Console.Clear();
			int i = 0;

			while (true) {
				board.Draw();

				if (i == 0) {
					Console.Write("");
				}
				
				board.Step();
				Thread.Sleep(200);
				i++;
			}
		}
	}
}