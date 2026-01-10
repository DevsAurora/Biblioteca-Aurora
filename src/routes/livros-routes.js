// livros-routes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/livros-controller");
const validarSchema = require("../middlewares/validar-schema");
const LivroSchema = require("../schemas/livro-schema");

// Formulário de criação/edição
router.get("/form", controller.formLivro);

// Criar livro
router.post("/", validarSchema(LivroSchema), controller.postLivro);

// Atualizar livro
router.post("/:id/update", validarSchema(LivroSchema), controller.updateLivro);

// Listar livros
router.get("/", controller.getLivros);

// Buscar livro por ID
router.get("/:id", controller.getLivroById);

// Deletar livro
router.post("/:id/delete", controller.deleteLivro);

module.exports = router;