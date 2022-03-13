#ifndef GAMEOFLIFE_BOARD_H
#define GAMEOFLIFE_BOARD_H


#include "Cell.h"

class Board {
private:
	unsigned int rows;
	unsigned int cols;
	Cell** cells;

	void PlaceRandom(float density, unsigned int seed);

public:

	Board(unsigned int rows, unsigned int cols, float density = .3, unsigned int seed = 1); // Constructor
	~Board(); // Destructor

	void Step();
	void Draw();
};


#endif //GAMEOFLIFE_BOARD_H
