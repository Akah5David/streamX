import pool from "../config/db.js";

export async function saveVerificationToken({ userId, token, expiresAt }) {
  const query = `   
    INSERT INTO verification_tokens
      (user_id, token, expires_at)
    VALUES
      ($1, $2, $3)
    RETURNING id, user_id, token, expires_at;
    `;

  const values = [userId, token, expiresAt];

  const result = await pool.query(query, values);

  console.log("VerificationToken Results", result);
  return result.rows[0];
}
