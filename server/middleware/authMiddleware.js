const jwt = require("jsonwebtoken");

const middleware = (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({ message: "Authorization denied" });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.secretkey);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = middleware;