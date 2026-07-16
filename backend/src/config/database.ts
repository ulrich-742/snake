import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const {
	DB_HOST,
	DB_PORT,
	DB_USER,
	DB_PASSWORD,
	DB_NAME,
} = process.env;

if (!DB_HOST || !DB_PORT || !DB_USER || DB_PASSWORD === undefined || !DB_NAME) {
	throw new Error(
		"Configuration MySQL incomplète dans le fichier .env.",
	);
}

const pool = mysql.createPool({
	host: DB_HOST,
	port: Number(DB_PORT),
	user: DB_USER,
	password: DB_PASSWORD,
	database: DB_NAME,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

export default pool;