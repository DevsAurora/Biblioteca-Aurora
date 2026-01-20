const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario-controller');
const validarSchema = require('../middlewares/validar-schema');
const UsuarioSchema = require('../schemas/usuario-schema');
const autenticar = require("../middlewares/auth");
const autorizar = require("../middlewares/authorize");


// Listar usuários
router.get('/', usuarioController.listarUsuarios);

// Formulário de criação de novo usuário
router.get('/form', autenticar, autorizar(["BIBLIOTECARIO"]), usuarioController.formUsuario);

// Formulário de edição de usuário existente
router.get('/form/:id', autenticar, autorizar(["BIBLIOTECARIO"]), usuarioController.formUsuario);

// Criar usuário
router.post('/', autenticar, autorizar(["BIBLIOTECARIO"]), validarSchema(UsuarioSchema), usuarioController.criarUsuario);

// Atualizar usuário
router.post('/:id/update', autenticar, autorizar(["BIBLIOTECARIO"]), validarSchema(UsuarioSchema), usuarioController.atualizarUsuario);

// Buscar usuário por ID
router.get('/:id', usuarioController.buscarUsuarioPorId);

// Deletar usuário
router.post('/:id/delete', autenticar, autorizar(["BIBLIOTECARIO"]), usuarioController.deletarUsuario);

module.exports = router;