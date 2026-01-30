const jwt = require("jsonwebtoken");

function chatAuth(req, res, next) {
  try {
    const h = req.headers.authorization || "";
    const token = h.startsWith("Bearer ") ? h.slice(7) : null;
    if (!token) return res.status(401).json({ok: false, error: "unauthorized"});

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.id_user) {
      return res.status(401).json({ok: false, error: "unauthorized"});
    }

    req.user = {id_user: decoded.id_user, name: decoded.name ?? "User"};
    next();
  } catch {
    return res.status(401).json({ok: false, error: "unauthorized"});
  }
}

module.exports = {chatAuth};
