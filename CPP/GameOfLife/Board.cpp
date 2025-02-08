// Copyright (c) 2025 Alexander Voglsperger.
// This code is licensed under the MIT license.

#include "Board.h"

#include <cstdio>
#include <cstdlib>
#include <sys/types.h>

#define MOVE_UP "\033[1;1H"
#define MAX_VAL 100

namespace impl {
	Board::Board(const uint rows, const uint cols, const float density, const uint seed):
		rows(rows), cols(cols) {

		// Initialize cells
		cells.resize(rows);
		for (uint row = 0; row < rows; ++row) {
			std::vector<Cell> row_cells;
			row_cells.reserve(cols);
			for (uint col = 0; col < cols; ++col) {
				row_cells.emplace_back();
			}
			cells[row] = row_cells;
		}

		PlaceRandom(density, seed);
	}

	// ===========================================================================================================
	void Board::PlaceRandom(const float density, const uint seed) {
		// Initialize prn with seed
		srand(seed);

		const int real_density = static_cast<int>(density * MAX_VAL);

		// Randomly place alive cells
		for(int row = 0; row < rows; ++row) {
			for(int col = 0; col < cols; ++col) {

				const int rnd = rand() % MAX_VAL; // NOLINT(*-msc50-cpp)
				cells[row][col].SetAlive(rnd < real_density);
			}
		}
		printf("\n\n");
	}

	// ===========================================================================================================
	void Board::Step() {
		for(int row = 0; row < rows; ++row) {
			for(int col = 0; col < cols; ++col) {

				// Calculate neighbours of current cell which are alive
				uint alive_neighbours = 0;
				for(int i = -1; i <= 1; ++i) {
					for(int j = -1; j <= 1; ++j) {
						if(i == 0 && j == 0) {
							continue;
						}

						const int neighbour_row = row + i;
						const int neighbour_col = col + j;

						if(neighbour_row < 0 || neighbour_row >= rows) {
							continue;
						}

						if(neighbour_col < 0 || neighbour_col >= cols) {
							continue;
						}

						if(cells[neighbour_row][neighbour_col].IsAlive()) {
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

	// ===========================================================================================================
	void Board::Draw(const bool full_draw) const {
		printf(MOVE_UP);
		for(int row = 0; row < rows; ++row) {
			for(int col = 0; col < cols; ++col) {
				if(full_draw) {
					cells[row][col].Draw();
					printf(" ");
				} else if(cells[row][col].Changed()) {
					printf("\033[%d;%dH", row + 1, col * 2 + 1);
					cells[row][col].Draw();
					printf(" ");
				}
			}
			printf("\n");
		}
	}
}