mod board;
mod cell;

use std::{thread, time};

fn main() {
	let mut board = board::Board::new();
	println!("{}", board.to_string());
	for _ in 0..500 {
		board.step();
		println!("{}", board.to_string());
		thread::sleep(time::Duration::from_millis(500));
	}
}

