const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "24h",
  });

  const isProd = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None" ? "none" : "strict",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  });

  return token;
};

module.exports = generateToken;
