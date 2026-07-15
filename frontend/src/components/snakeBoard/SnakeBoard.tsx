import { useEffect, useRef, useState } from "react";

import "./SnakeBoard.css";

type GameStatus = "En attente" | "En cours" | "Partie terminée";

type SnakeBoardProps = {
	playerName: string;
	status: GameStatus;
	onScoreChange: (score: number) => void;
	onGameOver: (finalScore: number) => void;
};

type Position = {
	x: number;
	y: number;
};

const BOARD_SIZE = 400;
const CELL_SIZE = 40;
const MOVE_DELAY = 500;

const INITIAL_SNAKE: Position[] = [
	{ x: 4, y: 5 },
	{ x: 3, y: 5 },
	{ x: 2, y: 5 },
];

const INITIAL_FOOD: Position = {
	x: 7,
	y: 3,
};

export default function SnakeBoard({ playerName, status }: SnakeBoardProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);

	useEffect(() => {
		if (status !== "En cours") {
			return;
		}

		setSnake(INITIAL_SNAKE);
	}, [status]);

	useEffect(() => {
		if (status !== "En cours") {
			return;
		}

		const intervalId = window.setInterval(() => {
			setSnake((currentSnake) => {
				const currentHead = currentSnake[0];

				const newHead: Position = {
					x: currentHead.x + 1,
					y: currentHead.y,
				};

				const newSnake = [newHead, ...currentSnake.slice(0, -1)];

				return newSnake;
			});
		}, MOVE_DELAY);

		return () => {
			window.clearInterval(intervalId);
		};
	}, [status]);

	useEffect(() => {
		if (status !== "En cours") {
			return;
		}

		const canvas = canvasRef.current;

		if (!canvas) {
			return;
		}

		const context = canvas.getContext("2d");

		if (!context) {
			return;
		}

		context.clearRect(0, 0, BOARD_SIZE, BOARD_SIZE);

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

		context.fillStyle = "#39ff88";

		for (const segment of snake) {
			context.fillRect(
				segment.x * CELL_SIZE,
				segment.y * CELL_SIZE,
				CELL_SIZE,
				CELL_SIZE,
			);
		}

		context.fillStyle = "#ff5d5d";

		context.fillRect(
			INITIAL_FOOD.x * CELL_SIZE,
			INITIAL_FOOD.y * CELL_SIZE,
			CELL_SIZE,
			CELL_SIZE,
		);
	}, [snake, status]);

	return (
		<section className="snake-board">
			<div className="snake-board__container">
				<div className="snake-board__header">
					<span className="snake-board__title">Plateau de jeu</span>
				</div>

				<div className="snake-board__content">
					{status === "En attente" && (
						<p className="snake-board__placeholder">
							Entre ton pseudo puis clique sur Commencer.
						</p>
					)}

					{status === "En cours" && (
						<div className="snake-board__game">
							<p className="snake-board__player">Partie de {playerName}</p>

							<canvas
								ref={canvasRef}
								className="snake-board__canvas"
								width={BOARD_SIZE}
								height={BOARD_SIZE}
							/>
						</div>
					)}

					{status === "Partie terminée" && (
						<p className="snake-board__placeholder">Partie terminée.</p>
					)}
				</div>
			</div>
		</section>
	);
}
