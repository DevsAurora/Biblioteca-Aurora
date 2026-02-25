const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const autenticar = require("../middlewares/auth");
const autorizar = require("../middlewares/authorize");

// Formulários
router.get("/register",  autenticar, autorizar(["BIBLIOTECARIO"]), (req, res) => res.render("register"));
router.get("/login", (req, res) => res.render("login"));

// Ações
router.post("/register", autenticar, autorizar(["BIBLIOTECARIO"]),  authController.register);
router.post("/login", authController.login);

router.get("/logout", (req, res) => {
  // limpa o cookie
  res.clearCookie("token");
  // renderiza página de logout
  res.render("logout");
});

module.exports = router;