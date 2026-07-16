import type { ResultSetHeader, RowDataPacket } from "mysql2";

import pool from "../config/database.js";

export type Player = RowDataPacket & {
	id: number;
	pseudo: string;
	created_at: Date;
	updated_at: Date;
};

export async function findAllPlayers(): Promise<Player[]> {
	const [rows] = await pool.query<Player[]>(
		`
			SELECT id, pseudo, created_at, updated_at
			FROM players
			ORDER BY created_at DESC
		`,
	);

	return rows;
}

export async function findPlayerById(
	playerId: number,
): Promise<Player | null> {
	const [rows] = await pool.query<Player[]>(
		`
			SELECT id, pseudo, created_at, updated_at
			FROM players
			WHERE id = ?
		`,
		[playerId],
	);

	return rows[0] ?? null;
}

export async function findPlayerByPseudo(
	pseudo: string,
): Promise<Player | null> {
	const [rows] = await pool.query<Player[]>(
		`
			SELECT id, pseudo, created_at, updated_at
			FROM players
			WHERE pseudo = ?
		`,
		[pseudo],
	);

	return rows[0] ?? null;
}

export async function insertPlayer(
	pseudo: string,
): Promise<number> {
	const [result] = await pool.execute<ResultSetHeader>(
		`
			INSERT INTO players (pseudo)
			VALUES (?)
		`,
		[pseudo],
	);

	return result.insertId;
}

export async function updatePlayerById(
	playerId: number,
	pseudo: string,
): Promise<boolean> {
	const [result] = await pool.execute<ResultSetHeader>(
		`
			UPDATE players
			SET pseudo = ?
			WHERE id = ?
		`,
		[pseudo, playerId],
	);

	return result.affectedRows > 0;
}

export async function deletePlayerById(
	playerId: number,
): Promise<boolean> {
	const [result] = await pool.execute<ResultSetHeader>(
		`
			DELETE FROM players
			WHERE id = ?
		`,
		[playerId],
	);

	return result.affectedRows > 0;
}