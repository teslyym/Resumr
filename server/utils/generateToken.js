const jwt = require("jsonwebtoken");

/**
 * Generates a JWT for the user, sets it as an httpOnly cookie,
 * and returns the token (in case you ever want it for testing).
 */
const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "24h",
  });

  const isProd = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "strict",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  });

  return token;
};

module.exports = generateToken;
