import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import PlayerBoard from "../../components/playerBoard/PlayerBoard";
import ScorePanel from "../../components/scorePanel/ScorePanel";
import SnakeBoard from "../../components/snakeBoard/SnakeBoard";
import "./Home.css";

type GameStatus = "En attente" | "En cours" | "Partie terminée";

export default function Home() {
	const [_gameStatus, setGameStatus] = useState<GameStatus>("En attente");

	function handleStartGame() {
		setGameStatus("En cours");
	}

	return (
		<div className="home">
			<Navbar />
			<main className="home__main">
				<PlayerBoard onStartGame={handleStartGame} />
				<ScorePanel score={0} bestScore={0} status="En attente" />
				<SnakeBoard />
			</main>
		</div>
	);
}
