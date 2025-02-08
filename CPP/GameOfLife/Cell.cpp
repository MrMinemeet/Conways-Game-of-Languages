#include <cstdio>

#include "Cell.h"

namespace impl {
	Cell::Cell() {
		this->is_alive = false;
		this->is_alive_next = false;
		this->changed = false;
	}

	// ===========================================================================================================
	void Cell::Step() {
		is_alive = is_alive_next;
	}

	// ===========================================================================================================
	void Cell::CalculateNextStep(const unsigned short alive_neighbours) {
		if(is_alive)
			is_alive_next = alive_neighbours == 2 || alive_neighbours == 3;
		else
			is_alive_next = alive_neighbours == 3;

		if(is_alive != is_alive_next)
			changed = true;
	}

	// ===========================================================================================================
	void Cell::Draw() const {
		// TODO: Maybe print emojis (if I get it working) - Unicode not detected atm.
		printf(is_alive ? "■" : "□");
	}

	// ===========================================================================================================
	bool Cell::IsAlive() const {
		return is_alive;
	}

	// ===========================================================================================================
	bool Cell::Changed() const {
		return changed;
	}

	// ===========================================================================================================
	void Cell::SetAlive(const bool alive) {
		is_alive = alive;
	}
}