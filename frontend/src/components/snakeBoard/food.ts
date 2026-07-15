import { BOARD_SIZE, CELL_SIZE } from "./board";
import type { Position } from "./types/snake";

export function generateFood(snake: Position[]): Position {
	const maxCells = BOARD_SIZE / CELL_SIZE;

	while (true) {
		const food: Position = [
			Math.floor(Math.random() * maxCells),
			Math.floor(Math.random() * maxCells),
		];

		const isOnSnake = snake.some(
			([snakeX, snakeY]) => snakeX === food[0] && snakeY === food[1],
		);

		if (!isOnSnake) {
			return food;
		}
	}
}
