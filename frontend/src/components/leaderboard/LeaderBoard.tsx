import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

import {
	deletePlayer,
	updatePlayer,
} from "../../api/playerApi";
import {
	getLeaderboard,
	type LeaderboardEntry,
} from "../../api/scoreApi";

import "./Leaderboard.css";

type LeaderboardProps = {
	refreshKey: number;
};

export default function Leaderboard({
	refreshKey,
}: LeaderboardProps) {
	const [players, setPlayers] = useState<LeaderboardEntry[]>([]);

	async function loadLeaderboard() {
		try {
			const leaderboard = await getLeaderboard();

			setPlayers(leaderboard);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		void loadLeaderboard();
	}, [refreshKey]);

	async function handleEditPlayer(player: LeaderboardEntry) {
		const newPseudo = window.prompt(
			"Modifier le pseudo :",
			player.pseudo,
		);

		if (!newPseudo) {
			return;
		}

		const normalizedPseudo = newPseudo.trim();

		if (!normalizedPseudo || normalizedPseudo === player.pseudo) {
			return;
		}

		try {
			await updatePlayer(player.id, normalizedPseudo);
			await loadLeaderboard();
		} catch (error) {
			console.error(error);

			if (error instanceof Error) {
				window.alert(error.message);
			}
		}
	}

	async function handleDeletePlayer(player: LeaderboardEntry) {
		const confirmed = window.confirm(
			`Supprimer le joueur ${player.pseudo} ?`,
		);

		if (!confirmed) {
			return;
		}

		try {
			await deletePlayer(player.id);
			await loadLeaderboard();
		} catch (error) {
			console.error(error);

			if (error instanceof Error) {
				window.alert(error.message);
			}
		}
	}

	return (
		<section className="leaderboard">
			<div className="leaderboard__container">
				<div className="leaderboard__header">
					<span className="leaderboard__title">
						Classement
					</span>

					<span className="leaderboard__description">
						Les meilleurs scores enregistrés.
					</span>
				</div>

				<div className="leaderboard__table-wrapper">
					<table className="leaderboard__table">
						<thead className="leaderboard__head">
							<tr className="leaderboard__row">
								<th className="leaderboard__heading">
									#
								</th>

								<th className="leaderboard__heading">
									Joueur
								</th>

								<th className="leaderboard__heading">
									Score
								</th>

								<th className="leaderboard__heading">
									Actions
								</th>
							</tr>
						</thead>

						<tbody className="leaderboard__body">
							{players.map((player, index) => (
								<tr
									className="leaderboard__row"
									key={player.id}
								>
									<td className="leaderboard__cell">
										{index + 1}
									</td>

									<td className="leaderboard__cell">
										{player.pseudo}
									</td>

									<td className="leaderboard__cell leaderboard__cell--score">
										{player.score}
									</td>

									<td className="leaderboard__cell">
										<div className="leaderboard__actions">
											<button
												className="leaderboard__button leaderboard__button--edit"
												type="button"
												aria-label={`Modifier le joueur ${player.pseudo}`}
												title="Modifier"
												onClick={() =>
													handleEditPlayer(player)
												}
											>
												<FaEdit />
											</button>

											<button
												className="leaderboard__button leaderboard__button--delete"
												type="button"
												aria-label={`Supprimer le joueur ${player.pseudo}`}
												title="Supprimer"
												onClick={() =>
													handleDeletePlayer(player)
												}
											>
												<FaTrash />
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
}