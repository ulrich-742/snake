import Navbar from "../../components/navbar/Navbar";
import PlayerBoard from "../../components/playerBoard/PlayerBoard";

import "./Home.css";

export default function Home() {
	return (
		<div className="home">
			<Navbar />
			<main className="home__main">
				<PlayerBoard />
			</main>
		</div>
	);
}
