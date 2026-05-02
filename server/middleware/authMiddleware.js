const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authenticated" });
  }
};

const requirePro = (req, res, next) => {
  if (req.user?.plan !== "pro") {
    return res
      .status(403)
      .json({ message: "Pro plan required for this feature" });
  }
  next();
};

module.exports = { protect, requirePro };
