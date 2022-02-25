using System.Diagnostics;

namespace HelloWorld
{
	class Program
	{
		static void Main(string[] args) {

			if (args.Contains("-h") || args.Contains("--help")) {
				Console.WriteLine("GameOfLife <rows> <cols> <steptime (ms)>");
			}

			int rows = 10;
			int cols = 10;
			int steptime = 200;
			int tmp;

			if (int.TryParse(args[0], out tmp))
				rows = tmp;
			if (int.TryParse(args[1], out tmp))
				cols = tmp;
			if (int.TryParse(args[2], out tmp))
				steptime = tmp;

			Board board = new Board(rows, cols, 0.1, new Random().Next());
			Console.Clear();
			int i = 0;

			while (true) {
				board.Draw();

				if (i == 0) {
					Console.Write("");
				}
				
				board.Step();
				Thread.Sleep(steptime);
				i++;
			}
		}
	}
}