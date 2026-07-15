import type { Direction, Position } from "./types/snake";

const INITIAL_SNAKE: Position[] = [
	[4, 5],
	[3, 5],
	[2, 5],
];

export function createSnake(): Position[] {
	return INITIAL_SNAKE.map(([x, y]) => [x, y]);
}

export function moveSnake(
	snake: Position[],
	direction: Direction,
	shouldGrow: boolean,
): Position[] {
	const [headX, headY] = snake[0];

	const newHead = getNextHead([headX, headY], direction);

	if (shouldGrow) {
		return [newHead, ...snake];
	}

	return [newHead, ...snake.slice(0, -1)];
}

function getNextHead([headX, headY]: Position, direction: Direction): Position {
	switch (direction) {
		case "UP":
			return [headX, headY - 1];

		case "DOWN":
			return [headX, headY + 1];

		case "LEFT":
			return [headX - 1, headY];

		case "RIGHT":
			return [headX + 1, headY];
	}
}
