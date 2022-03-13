#ifndef GAMEOFLIFE_CELL_H
#define GAMEOFLIFE_CELL_H


class Cell {
private:
	bool is_alive_next;

public:
	bool is_alive;
	bool changed;

	Cell(); // Constructor

	// Methods
	void CalculateNextStep(unsigned short alive_neighbours);
	void Step();
	void Draw() const;
};


#endif //GAMEOFLIFE_CELL_H
