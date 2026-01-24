const exemplarService = require("../services/exemplar-service");

// Listar exemplares de um livro
exports.listarPorLivro = async (req, res) => {
  const livroId = req.params.livroId;
  if (!livroId) return res.status(400).send("LivroId não informado");

  try {
    const exemplares = await exemplarService.listarPorLivro(livroId);
    res.render("exemplar-lista", { exemplares, livroId });
  } catch (err) {
    res.status(500).send("Erro ao listar exemplares");
  }
};

// Formulário de novo exemplar
exports.formNovo = (req, res) => {
  res.render("exemplar-novo", { livroId: req.params.livroId });
};

// Criar exemplar
exports.criar = async (req, res) => {
  try {
    await exemplarService.criarExemplar(req.params.livroId, req.body.codigo_tombo);
    res.redirect(`/exemplares/${req.params.livroId}`);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Excluir exemplar
exports.deletar = async (req, res) => {
  await exemplarService.deletarExemplar(req.params.id);
  res.redirect(`/exemplares/${req.body.livroId}`);
};

// Atualizar status
exports.atualizarStatus = async (req, res) => {
  await exemplarService.atualizarStatus(req.params.id, req.body.status);
  res.redirect(`/exemplares/${req.body.livroId}`);
};