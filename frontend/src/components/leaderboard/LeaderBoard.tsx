import { FaEdit, FaTrash } from "react-icons/fa";
import "./Leaderboard.css";

const players = [
	{
		id: 1,
		name: "Alex",
		score: 150,
	},
	{
		id: 2,
		name: "Emma",
		score: 120,
	},
	{
		id: 3,
		name: "Lucas",
		score: 95,
	},
];

export default function Leaderboard() {
	return (
		<section className="leaderboard">
			<div className="leaderboard__container">
				<div className="leaderboard__header">
					<span className="leaderboard__title">Classement</span>

					<span className="leaderboard__description">
						Les meilleurs scores enregistrés.
					</span>
				</div>

				<div className="leaderboard__table-wrapper">
					<table className="leaderboard__table">
						<thead className="leaderboard__head">
							<tr className="leaderboard__row">
								<th className="leaderboard__heading">#</th>
								<th className="leaderboard__heading">Joueur</th>
								<th className="leaderboard__heading">Score</th>
								<th className="leaderboard__heading">Actions</th>
							</tr>
						</thead>

						<tbody className="leaderboard__body">
							{players.map((player, index) => (
								<tr className="leaderboard__row" key={player.id}>
									<td className="leaderboard__cell">{index + 1}</td>

									<td className="leaderboard__cell">{player.name}</td>

									<td className="leaderboard__cell leaderboard__cell--score">
										{player.score}
									</td>

									<td className="leaderboard__cell">
										<div className="leaderboard__actions">
											<button
												className="leaderboard__button leaderboard__button--edit"
												type="button"
												aria-label={`Modifier le joueur ${player.name}`}
												title="Modifier"
											>
												<FaEdit />
											</button>

											<button
												className="leaderboard__button leaderboard__button--delete"
												type="button"
												aria-label={`Supprimer le joueur ${player.name}`}
												title="Supprimer"
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
