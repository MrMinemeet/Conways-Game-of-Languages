use crate::cell::Cell;

const ROWS: u16 = 10;
const COLS: u16 = 10;

pub struct Board {
    pub cells: [[Cell; COLS as usize]; ROWS as usize]
}