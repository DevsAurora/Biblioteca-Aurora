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