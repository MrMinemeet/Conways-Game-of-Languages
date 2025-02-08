// Copyright (c) 2025 Alexander Voglsperger.
// This code is licensed under the MIT license.

#pragma once

#include <vector>
#include <sys/types.h>

#include "Cell.h"

namespace impl {
	class Board {
		const uint rows;
		const uint cols;

		std::vector<std::vector<Cell>> cells;

	public:
		Board(uint rows, uint cols, float density = .3, uint seed = 1); // Constructor

		void Step();
		void Draw(bool full_draw) const;

	private:
		void PlaceRandom(float density, uint seed);
	};
}