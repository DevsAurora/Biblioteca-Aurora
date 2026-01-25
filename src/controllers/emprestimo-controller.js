const emprestimoService = require("../services/emprestimo-service");

exports.listar = async (req, res) => {
  const emprestimos = await emprestimoService.listarEmprestimos();
  res.render("emprestimos/lista", { emprestimos });
};

exports.registrar = async (req, res) => {
  try {
    await emprestimoService.registrarEmprestimo(
      req.body.usuarioId,
      req.body.exemplarId,
      req.body.dataDevolucaoPrevista
    );
    res.redirect("/emprestimos");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.finalizar = async (req, res) => {
  await emprestimoService.finalizarEmprestimo(req.params.id);
  res.redirect("/emprestimos");
};

exports.listarPorUsuario = async (req, res) => {
  try {
    console.log("DEBUG req.usuario:", req.usuario); // ajustado para o campo correto
    const usuarioId = req.usuario?.id; // usa req.usuario em vez de req.user
    if (!usuarioId) {
      return res.status(400).send("Usuário não autenticado");
    }

    const emprestimos = await emprestimoService.listarPorUsuario(usuarioId);
    res.render("emprestimos/emprestimo-lista", { emprestimos });
  } catch (err) {
    console.error("Erro em listarPorUsuario:", err);
    res.status(500).send("Erro ao listar empréstimos");
  }
};