import { NotFoundError } from "../errors/NotFoundError.js";
import { pool } from "./pool.js";

export async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

export async function postAMessage(username, message) {
  await pool.query(
    "INSERT INTO messages (username, message, post_time) VALUES ($1, $2, $3)",
    [username, message, new Date().toISOString()],
  );
}

export async function getMessageByID(id) {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [
    id,
  ]);

  if (rows.length === 0) throw new NotFoundError(`Message not found`);
  return rows;
}
