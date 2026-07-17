import { useEffect, useState } from "react";

import { createPlayer } from "../../api/playerApi";
import { createScore, getLeaderboard } from "../../api/scoreApi";
import Footer from "../../components/footer/footer";
import Instructions from "../../components/instructions/Instructions";
import Leaderboard from "../../components/leaderboard/LeaderBoard";
import Navbar from "../../components/navbar/Navbar";
import PlayerBoard from "../../components/playerBoard/PlayerBoard";
import ScorePanel from "../../components/scorePanel/ScorePanel";
import SnakeBoard from "../../components/snakeBoard/SnakeBoard";

import "./Home.css";

type GameStatus = "En attente" | "En cours" | "Partie terminée";

export default function Home() {
	const [playerId, setPlayerId] = useState<number | null>(null);
	const [playerName, setPlayerName] = useState("");
	const [gameStatus, setGameStatus] = useState<GameStatus>("En attente");
	const [score, setScore] = useState(0);
	const [bestScore, setBestScore] = useState(0);
	const [leaderboardRefreshKey, setLeaderboardRefreshKey] = useState(0);

	async function loadGlobalBestScore() {
		try {
			const leaderboard = await getLeaderboard();
			const globalBestScore = leaderboard[0]?.score ?? 0;

			setBestScore(globalBestScore);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		void loadGlobalBestScore();
	}, []);

	async function handleStartGame(name: string) {
		try {
			const player = await createPlayer(name);

			setPlayerId(player.id);
			setPlayerName(player.pseudo);
			setScore(0);
			setGameStatus("En cours");

			setLeaderboardRefreshKey((currentKey) => currentKey + 1);
		} catch (error) {
			console.error(error);

			if (error instanceof Error) {
				window.alert(error.message);
			}
		}
	}

	async function handleGameOver(finalScore: number) {
		setScore(finalScore);
		setGameStatus("Partie terminée");

		if (playerId === null) {
			return;
		}

		try {
			await createScore(playerId, finalScore, 0);

			setLeaderboardRefreshKey((currentKey) => currentKey + 1);

			await loadGlobalBestScore();
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="home">
			<Navbar />

			<main className="home__main">
				<div className="home__layout">
					<div className="home__left">
						<PlayerBoard
							status={gameStatus}
							onStartGame={handleStartGame}
						/>

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

						<Leaderboard refreshKey={leaderboardRefreshKey} />
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}