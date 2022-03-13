#include "Board.h"
#include <thread>
#include <cstdio>
#include <string>
#include <csignal>

#define WAIT_TIME_MS 100

#define CLEAR "\033[2J"

Board* board;

void signalHandler(int signum) {
	printf("Interrupt signal (%d) received.\n", signum);

	printf("Freeing up board");
	delete(board);

	exit(signum);
}


int main(int argc, char* argv[]) {
	if(argc != 3) {
		printf("Arguments required: rows cols\n");
		return 1;
	}

	// Register signal handler for Interrupt
	signal(SIGINT, signalHandler);


	const int rows = std::stoi(argv[1]);
	const int cols = std::stoi(argv[2]);

	board = new Board(rows, cols);


	printf(CLEAR);

	while(true) {
		board->Draw();
		board->Step();
		std::this_thread::sleep_for(std::chrono::milliseconds(WAIT_TIME_MS));
	}
}
