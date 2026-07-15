import { BOARD_SIZE, CELL_SIZE } from "./board";
import type { Position } from "./types/snake";

export function drawGame(
	context: CanvasRenderingContext2D,
	snake: Position[],
	food: Position,
): void {
	clearBoard(context);
	drawGrid(context);
	drawSnake(context, snake);
	drawFood(context, food);
}

function clearBoard(context: CanvasRenderingContext2D): void {
	context.clearRect(0, 0, BOARD_SIZE, BOARD_SIZE);
}

function drawGrid(context: CanvasRenderingContext2D): void {
	context.strokeStyle = "#173d27";
	context.lineWidth = 1;

	for (let position = 0; position <= BOARD_SIZE; position += CELL_SIZE) {
		context.beginPath();
		context.moveTo(position, 0);
		context.lineTo(position, BOARD_SIZE);
		context.stroke();

		context.beginPath();
		context.moveTo(0, position);
		context.lineTo(BOARD_SIZE, position);
		context.stroke();
	}
}

function drawSnake(context: CanvasRenderingContext2D, snake: Position[]): void {
	context.fillStyle = "#39ff88";

	for (const [x, y] of snake) {
		context.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
	}
}

function drawFood(context: CanvasRenderingContext2D, [x, y]: Position): void {
	context.fillStyle = "#ff5d5d";

	context.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}
