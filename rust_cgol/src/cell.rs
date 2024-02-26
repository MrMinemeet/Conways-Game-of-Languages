pub struct Cell {
    pub is_alive: bool,
    is_alive_next: bool,
}

impl Cell {
    pub fn new() -> Cell {
        Cell { is_alive: false, is_alive_next: false }
    }

    pub fn step(&mut self) {
        self.is_alive = self.is_alive_next
    }
}