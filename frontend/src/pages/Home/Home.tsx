import { useState } from "react";

import Footer from "../../components/footer/Footer";
import Instructions from "../../components/instructions/Instructions";
import Leaderboard from "../../components/leaderboard/Leaderboard";
import Navbar from "../../components/navbar/Navbar";
import PlayerBoard from "../../components/playerBoard/PlayerBoard";
import ScorePanel from "../../components/scorePanel/ScorePanel";
import SnakeBoard from "../../components/snakeBoard/SnakeBoard";

import "./Home.css";

type GameStatus = "En attente" | "En cours" | "Partie terminée";

export default function Home() {
	const [playerName, setPlayerName] = useState("");
	const [gameStatus, setGameStatus] = useState<GameStatus>("En attente");
	const [score, setScore] = useState(0);
	const [bestScore, setBestScore] = useState(0);

	function handleStartGame(name: string) {
		setPlayerName(name);
		setScore(0);
		setGameStatus("En cours");
	}

	function handleGameOver(finalScore: number) {
		setScore(finalScore);
		setGameStatus("Partie terminée");

		if (finalScore > bestScore) {
			setBestScore(finalScore);
		}
	}

	return (
		<div className="home">
			<Navbar />

			<main className="home__main">
				<div className="home__layout">
					<div className="home__left">
						<PlayerBoard onStartGame={handleStartGame} />
						<Instructions />
					</div>

					<div className="home__center">
						<SnakeBoard
							playerName={playerName}
							status={gameStatus}
							onScoreChange={setScore}
							onGameOver={handleGameOver}
						/>
					</div>

					<div className="home__right">
						<ScorePanel
							score={score}
							bestScore={bestScore}
							status={gameStatus}
						/>

						<Leaderboard />
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
