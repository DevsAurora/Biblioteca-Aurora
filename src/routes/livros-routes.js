// livros-routes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/livros-controller");
const validarSchema = require("../middlewares/validar-schema");
const LivroSchema = require("../schemas/livro-schema");
const autenticar = require("../middlewares/auth");
const autorizar = require("../middlewares/authorize");

// Formulário de criação/edição | Apenas Bibliotecarios
router.get("/form", autenticar, autorizar(["BIBLIOTECARIO"]), controller.formLivro);

// Criar livro | Apenas Bibliotecarios
router.post("/", autenticar, autorizar(["BIBLIOTECARIO"]), validarSchema(LivroSchema), controller.postLivro);

// Atualizar livro
router.post("/:id/update", autenticar, autorizar(["BIBLIOTECARIO"]), validarSchema(LivroSchema), controller.updateLivro);

// Listar livros
router.get("/", controller.getLivros);

// Buscar livro por ID
router.get("/:id", controller.getLivroById);

// Deletar livro
router.post("/:id/delete", autenticar, autorizar(["BIBLIOTECARIO"]), controller.deleteLivro);

module.exports = router;