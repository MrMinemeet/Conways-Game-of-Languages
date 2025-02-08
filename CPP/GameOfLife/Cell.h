// Copyright (c) 2025 Alexander Voglsperger.
// This code is licensed under the MIT license.

#pragma once

namespace impl {
	class Cell {
		bool is_alive_next;
		bool is_alive;
		bool changed;

	public:
		Cell(); // Constructor

		// Methods
		void CalculateNextStep(unsigned short alive_neighbours);
		void Step();
		void Draw() const;
		void SetAlive(bool alive);
		[[nodiscard]] bool IsAlive() const;
		[[nodiscard]] bool Changed() const;
	};
}