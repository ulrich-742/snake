import { useEffect, useRef, useState } from "react";

import { BOARD_SIZE, MOVE_DELAY } from "./board";
import {
	checkFoodCollision,
	checkSelfCollision,
	checkWallCollision,
} from "./collision/collision";
import { getNextDirection, INITIAL_DIRECTION } from "./direction";
import { generateFood } from "./food";
import { drawGame } from "./render";
import { createSnake, moveSnake } from "./snake";
import type { Direction, Position } from "./types/snake";

import "./SnakeBoard.css";

type GameStatus = "En attente" | "En cours" | "Partie terminée";

type SnakeBoardProps = {
	playerName: string;
	status: GameStatus;
	onScoreChange: (score: number) => void;
	onGameOver: (finalScore: number) => void;
};

export default function SnakeBoard({
	playerName,
	status,
	onScoreChange,
	onGameOver,
}: SnakeBoardProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const directionRef = useRef<Direction>(INITIAL_DIRECTION);
	const scoreRef = useRef(0);

	const [snake, setSnake] = useState<Position[]>(createSnake());
	const [food, setFood] = useState<Position>(() => generateFood(createSnake()));
	const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
	const [score, setScore] = useState(0);

	useEffect(() => {
		directionRef.current = direction;
	}, [direction]);

	useEffect(() => {
		scoreRef.current = score;
	}, [score]);

	useEffect(() => {
		if (status !== "En cours") {
			return;
		}

		const initialSnake = createSnake();

		setSnake(initialSnake);
		setFood(generateFood(initialSnake));
		setDirection(INITIAL_DIRECTION);
		setScore(0);

		directionRef.current = INITIAL_DIRECTION;
		scoreRef.current = 0;

		onScoreChange(0);
	}, [status, onScoreChange]);

	useEffect(() => {
		if (status !== "En cours") {
			return;
		}

		function handleKeyDown(event: KeyboardEvent) {
			const arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

			if (!arrowKeys.includes(event.key)) {
				return;
			}

			event.preventDefault();

			const nextDirection = getNextDirection(directionRef.current, event.key);

			directionRef.current = nextDirection;
			setDirection(nextDirection);
		}

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [status]);

	useEffect(() => {
		if (status !== "En cours") {
			return;
		}

		const intervalId = window.setInterval(() => {
			setSnake((currentSnake) => {
				const temporarySnake = moveSnake(
					currentSnake,
					directionRef.current,
					false,
				);

				const nextHead = temporarySnake[0];

				if (checkWallCollision(nextHead)) {
					window.clearInterval(intervalId);
					onGameOver(scoreRef.current);

					return currentSnake;
				}

				const ateFood = checkFoodCollision(nextHead, food);

				const nextSnake = moveSnake(
					currentSnake,
					directionRef.current,
					ateFood,
				);

				if (checkSelfCollision(nextSnake)) {
					window.clearInterval(intervalId);
					onGameOver(scoreRef.current);

					return currentSnake;
				}

				if (ateFood) {
					const newScore = scoreRef.current + 10;

					scoreRef.current = newScore;
					setScore(newScore);
					onScoreChange(newScore);
					setFood(generateFood(nextSnake));
				}

				return nextSnake;
			});
		}, MOVE_DELAY);

		return () => {
			window.clearInterval(intervalId);
		};
	}, [food, status, onGameOver, onScoreChange]);

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

		drawGame(context, snake, food);
	}, [food, snake, status]);

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
