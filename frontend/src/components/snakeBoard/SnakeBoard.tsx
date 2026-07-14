import "./SnakeBoard.css";

export default function SnakeBoard() {
	return (
		<section className="snake-board">
			<div className="snake-board__container">
				<div className="snake-board__header">
					<span className="snake-board__title">
						Plateau de jeu
					</span>
				</div>

				<div className="snake-board__content">
					<p className="snake-board__placeholder">
						Le jeu apparaîtra ici.
					</p>
				</div>
			</div>
		</section>
	);
}