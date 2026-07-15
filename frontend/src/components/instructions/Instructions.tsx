import "./Instructions.css";

export default function Instructions() {
	return (
		<section className="instructions">
			<div className="instructions__container">
				<div className="instructions__header">
					<span className="instructions__title">Instructions</span>

					<span className="instructions__description">
						Comment jouer à Snake.
					</span>
				</div>

				<div className="instructions__list">
					<div className="instructions__item">
						<span className="instructions__icon">⬆️</span>
						<span className="instructions__text">
							Utilise les flèches du clavier pour déplacer le serpent.
						</span>
					</div>

					<div className="instructions__item">
						<span className="instructions__icon">🍎</span>
						<span className="instructions__text">
							Mange les pommes pour augmenter ton score.
						</span>
					</div>

					<div className="instructions__item">
						<span className="instructions__icon">🧱</span>
						<span className="instructions__text">
							Évite de toucher les murs.
						</span>
					</div>

					<div className="instructions__item">
						<span className="instructions__icon">🐍</span>
						<span className="instructions__text">
							Ne touche pas le corps du serpent.
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}
