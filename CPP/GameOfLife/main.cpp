#include <cstdint>
#include <memory>
#include <string>
#include <thread>

#include "Board.h"

using namespace impl;

constexpr uint16_t WAIT_TIME_MS = 100;
constexpr std::string CLEAR_SYMBOL = "\033[2J";

[[noreturn]] int main(const int argc, char* argv[]) {
	if(argc != 3) {
		throw std::invalid_argument("Expected to have 'rows' and 'cols' as arguments");
	}

	const int rows = std::stoi(argv[1]);
	const int cols = std::stoi(argv[2]);

	const auto board = std::make_shared<Board>(rows, cols);

	printf(CLEAR_SYMBOL.c_str());
	board->Draw(true);

	while(true) {
		board->Draw(false);
		board->Step();
		std::this_thread::sleep_for(std::chrono::milliseconds(WAIT_TIME_MS));
	}
}
