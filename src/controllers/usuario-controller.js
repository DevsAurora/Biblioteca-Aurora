const usuarioService = require('../services/usuario-service');

// Formulário de criação/edição de usuário
async function formUsuario(req, res) {
  let usuario = {};
  if (req.params.id) {
    usuario = await usuarioService.buscarUsuarioPorId(Number(req.params.id));
    if (!usuario) return res.status(404).send("Usuário não encontrado");
  }
  res.render("usuarios/form", { usuario });
}

// Criar usuário
async function criarUsuario(req, res) {
  try {
    const usuario = await usuarioService.criarUsuario(req.body);
    // Depois de criar, redireciona para a lista
    res.redirect("/usuarios");
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// Listar usuários
async function listarUsuarios(req, res) {
  const usuarios = await usuarioService.listarUsuarios();
  res.render("usuarios/list", { usuarios });
}

// Buscar usuário por ID (JSON, se precisar API)
async function buscarUsuarioPorId(req, res) {
  const usuario = await usuarioService.buscarUsuarioPorId(Number(req.params.id));
  if (!usuario) return res.status(404).send("Usuário não encontrado");
  res.json(usuario);
}

// Atualizar usuário
async function atualizarUsuario(req, res) {
  try {
    await usuarioService.atualizarUsuario(Number(req.params.id), req.body);
    res.redirect("/usuarios");
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// Deletar usuário
async function deletarUsuario(req, res) {
  try {
    await usuarioService.deletarUsuario(Number(req.params.id));
    res.redirect("/usuarios");
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = {
  formUsuario,
  criarUsuario,
  listarUsuarios,
  buscarUsuarioPorId,
  atualizarUsuario,
  deletarUsuario
};