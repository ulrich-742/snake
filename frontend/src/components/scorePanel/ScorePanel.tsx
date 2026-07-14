import "./ScorePanel.css";

type ScorePanelProps = {
	score: number;
	bestScore: number;
	status: "En attente" | "En cours" | "Partie terminée";
};

export default function ScorePanel({
	score,
	bestScore,
	status,
}: ScorePanelProps) {
	return (
		<section className="score-panel">
			<div className="score-panel__container">
				<div className="score-panel__item">
					<span className="score-panel__label">
						Score
					</span>

					<span className="score-panel__value">
						{score}
					</span>
				</div>

				<div className="score-panel__item">
					<span className="score-panel__label">
						Meilleur score
					</span>

					<span className="score-panel__value">
						{bestScore}
					</span>
				</div>

				<div className="score-panel__item">
					<span className="score-panel__label">
						Statut
					</span>

					<span className="score-panel__status">
						{status}
					</span>
				</div>
			</div>
		</section>
	);
}