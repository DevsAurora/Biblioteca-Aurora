const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;

function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.split(" ")[1] : req.cookies.token; // 👈 busca no cookie

  if (!token) return res.status(401).json({ message: "Token não fornecido" });

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    req.usuario = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}

module.exports = autenticar;