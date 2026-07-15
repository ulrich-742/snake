import { useState } from "react";
import Footer from "../../components/footer/Footer";
import Instructions from "../../components/instructions/Instructions";
import Leaderboard from "../../components/leaderboard/LeaderBoard";
import Navbar from "../../components/navbar/Navbar";
import PlayerBoard from "../../components/playerBoard/PlayerBoard";
import ScorePanel from "../../components/scorePanel/ScorePanel";
import SnakeBoard from "../../components/snakeBoard/SnakeBoard";

import "./Home.css";

type GameStatus = "En attente" | "En cours" | "Partie terminée";

export default function Home() {
	const [gameStatus, setGameStatus] = useState<GameStatus>("En attente");

	function handleStartGame() {
		setGameStatus("En cours");
	}

	return (
		<div className="home">
			<Navbar />

			<main className="home__main">
				<div className="home__introduction">
					<span className="home__subtitle">Bienvenue dans</span>

					<h1 className="home__title">Snake Game</h1>

					<p className="home__description">
						Mange les pommes, évite les collisions et réalise le meilleur score.
					</p>
				</div>

				<div className="home__layout">
					<aside className="home__sidebar home__sidebar--left">
						<PlayerBoard onStartGame={handleStartGame} />

						<Instructions />
					</aside>

					<div className="home__game">
						<SnakeBoard />
					</div>

					<aside className="home__sidebar home__sidebar--right">
						<ScorePanel score={0} bestScore={0} status={gameStatus} />

						<Leaderboard />
					</aside>
				</div>
				<Footer />
			</main>
		</div>
	);
}
