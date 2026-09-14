import pool from "../config/db.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendConfirmationEmail } from "../util/send-email-notification.js";
import { saveVerificationToken } from "../model/verificationToken.js";

dotenv.config();

const signUp = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.status = 422;
    return next(error);
  }

  const username = req.body.userName;
  const password = req.body.userPassword;
  const email = req.body.userEmail;

  try {
    // Check if user already exists
    const existing = await pool.query(
      "SELECT email FROM users WHERE email = $1",
      [email]
    );

    if (existing.rows.length > 0) {
      const error = new Error(
        "User already exists with this email"
      );
      error.status = 422;
      return next(error);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const result = await pool.query(
      `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [username, email, hashedPassword]
    );

    const user = result.rows[0];

    // Generate verification token
    const verificationToken = crypto
      .randomBytes(32)
      .toString("hex");

    // Save verification token
    await saveVerificationToken({
      userId: user.id,
      token: verificationToken,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    });

    // Send confirmation email
    await sendConfirmationEmail(
      email,
      username,
      verificationToken
    );

    res.status(201).json({
      message: "User registered successfully",
      signUpUser: {
        id: user.id.toString(),
        username,
        email,
      },
    });

  } catch (err) {
    console.error("Signup error:", err);

    const error = new Error("Database query error");
    error.status = 500;
    error.data = err.message;

    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const email = req.body.userEmail;
    const password = req.body.userPassword;

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      const error = new Error("User not found with this email");
      error.status = 401;
      return next(error);
    }

    const user = result.rows[0];

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      const error = new Error("Invalid password");
      error.status = 401;
      return next(error);
    }

    const token = jwt.sign(
      {
        email: user.email,
        id: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({
      message: "Login successful",
    });
  } catch (err) {
    console.error("login error:", err);
    return next(err);
  }
};

export default { signUp, login };
