cmake_minimum_required(VERSION 3.21.1)
project(GameOfLife)

set(CMAKE_CXX_STANDARD 20)

add_executable(GameOfLife
        main.cpp
        Cell.cpp
        Cell.h
        Board.cpp
        Board.h
)
