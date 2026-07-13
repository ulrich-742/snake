import "./PlayerBoard.css";

export default function PlayerBoard() {
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
					/>

					<button className="player-board__button" type="button">
						Commencer
					</button>
				</div>
			</div>
		</section>
	);
}