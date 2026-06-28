import pool from "../config/db.js";

class UserModel {
  // Create a new user
  static async createUser(name, email) {
    const query = `
      INSERT INTO users(name, email)
      VALUES($1, $2)
      RETURNING *;
    `;

    const values = [name, email];

    const result = await pool.query(query, values);

    return result.rows[0];
  }

  // Get all users
  static async getUsers() {
    const result = await pool.query(
      "SELECT * FROM users ORDER BY id;"
    );

    return result.rows;
  }

  // Get one user
  static async getUserById(id) {
    const result = await pool.query(
      "SELECT * FROM users WHERE id = $1;",
      [id]
    );

    return result.rows[0];
  }

  // Update user
  static async updateUser(id, name, email) {
    const query = `
      UPDATE users
      SET name = $1,
          email = $2
      WHERE id = $3
      RETURNING *;
    `;

    const values = [name, email, id];

    const result = await pool.query(query, values);

    return result.rows[0];
  }

  // Delete user
  static async deleteUser(id) {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *;",
      [id]
    );

    return result.rows[0];
  }
}

export default UserModel;