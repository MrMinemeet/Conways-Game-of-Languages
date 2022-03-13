#include <cstdlib>
#include <cstdio>
#include "Board.h"

#define MOVE_UP "\033[1;1H"
#define MAX_VAL 100

Board::Board(unsigned int rows, unsigned int cols, float density, unsigned int seed) {
	this->rows = rows;
	this->cols = cols;

	// Create array
	cells = new Cell*[this->rows];
	for(int row = 0; row < this->rows; row++) {
		cells[row] = new Cell[this->cols];
	}

	PlaceRandom(density, seed);
}

Board::~Board() {
	for(int row = 0; row < rows; ++row) {
		delete(cells[row]);
	}
	delete(cells);
}

void Board::PlaceRandom(float density, unsigned int seed) {
	// Initialize prn with seed
	srand(seed);

	const int real_density = (int)(density * MAX_VAL);

	// Randomly place alive cells
	for(int row = 0; row < rows; ++row) {
		for(int col = 0; col < cols; ++col) {
			int rnd = rand() % MAX_VAL;
			cells[row][col].is_alive = rnd < real_density;
		}
	}
	printf("\n\n");
}

void Board::Step() {
	for(int row = 0; row < rows; ++row) {
		for(int col = 0; col < cols; ++col) {

			// Calculate neighbours of current cell which are alive
			int alive_neighbours = 0;
			for(int i = -1; i <= 1; ++i) {
				for(int j = -1; j <= 1; ++j) {
					if(i == 0 && j == 0) {
						continue;
					}

					int neighbour_row = row + i;
					int neighbour_col = col + j;

					if(neighbour_row < 0 || neighbour_row >= rows) {
						continue;
					}

					if(neighbour_col < 0 || neighbour_col >= cols) {
						continue;
					}

					if(cells[neighbour_row][neighbour_col].is_alive) {
						alive_neighbours++;
					}
				}
			}

			cells[row][col].CalculateNextStep(alive_neighbours);
		}
	}

	for(int row = 0; row < rows; ++row) {
		for(int col = 0; col < cols; ++col) {
			cells[row][col].Step();
		}
	}
}

void Board::Draw(bool full_draw) {
	printf(MOVE_UP);
	for(int row = 0; row < rows; ++row) {
		for(int col = 0; col < cols; ++col) {
			if(full_draw) {
				cells[row][col].Draw();
				printf(" ");
			} else if(cells[row][col].changed) {
				printf("\033[%d;%dH", row + 1, col * 2 + 1);
				cells[row][col].Draw();
				printf(" ");
			}
		}
		printf("\n");
	}
}
