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
	function handleTestScore() {
		onScoreChange(10);
	}

	function handleTestGameOver() {
		onGameOver(10);
	}

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
						<div>
							<p className="snake-board__placeholder">Partie de {playerName}</p>

							<button type="button" onClick={handleTestScore}>
								Tester le score
							</button>

							<button type="button" onClick={handleTestGameOver}>
								Tester la fin
							</button>
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
