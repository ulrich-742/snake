import { BOARD_SIZE, CELL_SIZE } from "../board";
import type { Position } from "../types/snake";

export function checkWallCollision([headX, headY]: Position): boolean {
	const maxCells = BOARD_SIZE / CELL_SIZE;

	return headX < 0 || headY < 0 || headX >= maxCells || headY >= maxCells;
}

export function checkSelfCollision(snake: Position[]): boolean {
	const [head, ...body] = snake;

	return body.some(([bodyX, bodyY]) => bodyX === head[0] && bodyY === head[1]);
}

export function checkFoodCollision(head: Position, food: Position): boolean {
	return head[0] === food[0] && head[1] === food[1];
}
