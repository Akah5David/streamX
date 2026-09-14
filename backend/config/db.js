import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


console.log("DB Details: ", {
  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
});

//Test the connection (optional)
async function testConnection() {
  try {
    const connection = await pool.connect();
    console.log("Database connection pool created successfully.");
    connection.release();
  } catch (error) {
    console.error("Error creating database connection pool:", error);
  }
}

testConnection();

export default pool;
