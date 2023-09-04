const jwt = require("jsonwebtoken");

const verifyAndDecodeJwtToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log({ decodedToken });

    return decodedToken;
  } catch (error) {
    console.error("JWT verification error:", error);
    return null;
  }
};

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = verifyAndDecodeJwtToken(token);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.user = user;

  next();
};

module.exports = verifyToken;
