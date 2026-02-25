const express = require("express");
const router = express.Router();
const autenticar = require("../middlewares/auth");
const autorizar = require("../middlewares/authorize"); // corrigido para "authorize"
const controller = require("../controllers/exemplar-controller");

// Listar exemplares de um livro
router.get("/:livroId", autenticar, controller.listarPorLivro);

// Formulário de cadastro de exemplar (apenas bibliotecário)
router.get("/novo/:livroId", autenticar, autorizar(["BIBLIOTECARIO"]), controller.formNovo);

// Criar exemplar
router.post("/novo/:livroId", autenticar, autorizar(["BIBLIOTECARIO"]), controller.criar);

// Excluir exemplar
router.post("/:id/delete", autenticar, autorizar(["BIBLIOTECARIO"]), controller.deletar);

// Atualizar status exemplar
router.post("/:id/status", autenticar, autorizar(["BIBLIOTECARIO"]), controller.atualizarStatus);

module.exports = router;