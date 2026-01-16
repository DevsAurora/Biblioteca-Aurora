const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario-controller');
const validarSchema = require('../middlewares/validar-schema');
const UsuarioSchema = require('../schemas/usuario-schema');

// Listar usuários
router.get('/', usuarioController.listarUsuarios);

// Formulário de criação de novo usuário
router.get('/form', usuarioController.formUsuario);

// Formulário de edição de usuário existente
router.get('/form/:id', usuarioController.formUsuario);

// Criar usuário
router.post('/', validarSchema(UsuarioSchema), usuarioController.criarUsuario);

// Atualizar usuário
router.post('/:id/update', validarSchema(UsuarioSchema), usuarioController.atualizarUsuario);

// Buscar usuário por ID
router.get('/:id', usuarioController.buscarUsuarioPorId);

// Deletar usuário
router.post('/:id/delete', usuarioController.deletarUsuario);

module.exports = router;