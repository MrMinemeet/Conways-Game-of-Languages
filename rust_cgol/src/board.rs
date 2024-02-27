use std::fmt::Display;
use crate::cell::Cell;
use rand::Rng;


const ROWS: usize = 10;
const COLS: usize = 10;

#[derive(Clone, Copy)]
pub struct Board {
    cells: [[Cell; COLS]; ROWS]
}

impl Board {
    pub fn new() -> Board {
        Board::new_with_arg(0.5, 1)
    }

    pub fn new_with_arg(density: f32, seed: u64) -> Board {
        let cells = [[Cell::new(); COLS]; ROWS];
        let mut board = Board { cells };
        board.place_random(density, seed);
        board
    }

    pub fn step(&mut self) {
        for row in 0..ROWS {
            for col in 0..COLS {
                let neighbors = self.count_neighbors(&row, &col);
                self.cells[row][col].calculate_next_step(neighbors);
            }
        }

        for row in 0..ROWS {
            for col in 0..COLS {
                self.cells[row][col].step();
            }
        }
    }

    fn place_random(& mut self, density: f32, _seed: u64) {
        // Generate rng
        // TODO: Use seed
        let mut rng = rand::thread_rng();
        for row in 0..ROWS {
            for col in 0..COLS {
                // Generate random float between 0 and 1 (detected by type inference)
                let rand_value: f32 = rng.gen();
                self.cells[row][col].is_alive = rand_value < density;
            }
        }
    }

    fn count_neighbors(&self, row: &usize, col: &usize) -> u8 {
        let mut neighbors = 0;

        // Go through neighbor-offset
        for row_offset in -1i8..=1 { // Xi8 sets type to i8 (type like "rowOffset:i8" not possible)
            for col_offset in -1i8..=1 {
                // Don't compare with itself
                if row_offset == 0 || col_offset == 0 {
                    continue;
                }

                let row_neighbor = *row as isize + row_offset as isize;
                let col_neighbor = *col as isize + col_offset as isize;

                // Check if neighbor is within bounds
                if row_neighbor < 0 || ROWS as isize <= row_neighbor ||
                    col_neighbor < 0 || COLS as isize <= col_neighbor {
                    continue
                }
                let cell = self.cells[row_neighbor as usize][col_neighbor as usize];
                if cell.is_alive {
                    neighbors += 1;
                }
            }
        }

        neighbors
    }
}

impl Display for Board {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let mut result = String::new();
        for row in 0..ROWS {
            for col in 0..COLS {
                result.push_str(&self.cells[row][col].to_string());
                result.push_str(" ")
            }
            result.push_str("\n");
        }
        write!(f, "{}", result)
    }
}