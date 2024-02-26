
#[derive(Clone, Copy)]
pub struct Cell {
    pub is_alive: bool,
    is_alive_next: bool,
}

impl ToString for Cell {
    fn to_string(&self) -> String {
        if self.is_alive {
            "😀".to_string()
        } else {
            "💀".to_string()
        }
    }
}

impl Cell {
    pub fn new() -> Cell {
        Cell { is_alive: false, is_alive_next: false }
    }

    pub fn step(&mut self) {
        self.is_alive = self.is_alive_next
    }

    pub fn calculate_next_step(&mut self, neighbors: u8) {
        if self.is_alive {
            self.is_alive_next = neighbors == 2 || neighbors == 3
        } else {
            self.is_alive_next = neighbors == 3
        }
    }
}