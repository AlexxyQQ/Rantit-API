const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
function verifyUser(req, res, next) {
  try {
    // Get token from request header
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      // Token not found
      return res
        .status(403)
        .json({ success: false, message: "Access denied. No token provided." });
    }
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.user = decoded;
    res.locals.token = token;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
}

function verifyAPIReq(req, res, next) {
  try {
    const apiSecret = req.headers.apisecret;
    if (!apiSecret) {
      // Token not found
      return res
        .status(403)
        .json({ success: false, message: "Access denied. No token provided." });
    }
    if (apiSecret !== process.env.API_SECRET) {
      return res
        .status(403)
        .json({ success: false, message: "Access denied. Invalid token." });
    }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
}

exports.verifyUser = verifyUser;
exports.verifyAPIReq = verifyAPIReq;
