const authService = require("../services/auth-service");

async function register(req, res) {
  try {
    const usuario = await authService.registrarUsuario(req.body);
    res.render("register-success", { usuario });
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function login(req, res) {
  try {
    const { token, usuario } = await authService.login(req.body.email, req.body.senha);

    // grava token em cookie httpOnly
    res.cookie("token", token, {
      httpOnly: true,   // não acessível via JS do navegador
      secure: false,    // em produção use true (HTTPS)
      maxAge: 60 * 60 * 1000 // 1 hora
    });

    res.render("login-success", { usuario });
  } catch (err) {
    res.status(401).send(err.message);
  }
}

module.exports = { register, login };