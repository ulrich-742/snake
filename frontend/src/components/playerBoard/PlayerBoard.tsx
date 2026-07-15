import { useState } from "react";

import "./PlayerBoard.css";

type PlayerBoardProps = {
	onStartGame: (playerName: string) => void;
};

export default function PlayerBoard({ onStartGame }: PlayerBoardProps) {
	const [playerName, setPlayerName] = useState("");

	function handleStartGame() {
		const normalizedPlayerName = playerName.trim();

		if (!normalizedPlayerName) {
			return;
		}

		onStartGame(normalizedPlayerName);
	}

	return (
		<section className="player-board">
			<div className="player-board__container">
				<div className="player-board__header">
					<span className="player-board__label">Joueur</span>

					<span className="player-board__description">
						Entre ton pseudo pour commencer une partie.
					</span>
				</div>

				<div className="player-board__form">
					<input
						className="player-board__input"
						type="text"
						placeholder="Exemple : Alex"
						maxLength={30}
						value={playerName}
						onChange={(event) => setPlayerName(event.target.value)}
					/>

					<button
						className="player-board__button"
						type="button"
						onClick={handleStartGame}
					>
						Commencer
					</button>
				</div>
			</div>
		</section>
	);
}
