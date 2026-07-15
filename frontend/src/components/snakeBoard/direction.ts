import type { Direction } from "./types/snake";

export const INITIAL_DIRECTION: Direction = "RIGHT";

export function getNextDirection(
	currentDirection: Direction,
	key: string,
): Direction {
	switch (key) {
		case "ArrowUp":
			if (currentDirection !== "DOWN") {
				return "UP";
			}
			break;

		case "ArrowDown":
			if (currentDirection !== "UP") {
				return "DOWN";
			}
			break;

		case "ArrowLeft":
			if (currentDirection !== "RIGHT") {
				return "LEFT";
			}
			break;

		case "ArrowRight":
			if (currentDirection !== "LEFT") {
				return "RIGHT";
			}
			break;
	}

	return currentDirection;
}
