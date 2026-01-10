const livroService = require("../services/livros-service");

// Criar livro
async function postLivro(req, res) {
  try {
    await livroService.criarLivro(req.body);
    res.redirect("/livros");
  } catch (err) {
    console.error("Erro ao criar livro:", err);
    res.status(500).json({ message: "Erro ao criar livro", error: err.message });
  }
}

// Atualizar livro
async function updateLivro(req, res) {
  try {
    await livroService.atualizarLivro(req.params.id, req.body);
    res.redirect("/livros");
  } catch (err) {
    console.error("Erro ao atualizar livro:", err);
    res.status(500).json({ message: "Erro ao atualizar livro", error: err.message });
  }
}

// Listar livros
async function getLivros(req, res) {
  try {
    const livros = await livroService.listarLivros();
    res.render("livros/lista", { livros });
  } catch (err) {
    console.error("Erro ao listar livros:", err);
    res.status(500).json({ message: "Erro ao listar livros", error: err.message });
  }
}

// Buscar livro por ID
async function getLivroById(req, res) {
  try {
    const livro = await livroService.buscarLivroPorId(req.params.id);
    if (!livro) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }
    res.render("livros/detalhes", { livro });
  } catch (err) {
    console.error("Erro ao buscar livro:", err);
    res.status(500).json({ message: "Erro ao buscar livro", error: err.message });
  }
}

// Deletar livro
async function deleteLivro(req, res) {
  try {
    await livroService.deletarLivro(req.params.id);
    res.redirect("/livros");
  } catch (err) {
    console.error("Erro ao deletar livro:", err);
    res.status(500).json({ message: "Erro ao deletar livro", error: err.message });
  }
}

// Mostrar formulário de criação/edição
async function formLivro(req, res) {
  try {
    let livro = null;
    if (req.query.id) {
      livro = await livroService.buscarLivroPorId(req.query.id);
    }
    res.render("livros/form", { livro });
  } catch (err) {
    console.error("Erro ao carregar formulário:", err);
    res.status(500).json({ message: "Erro ao carregar formulário", error: err.message });
  }
}

module.exports = {
  postLivro,
  updateLivro,
  getLivros,
  getLivroById,
  deleteLivro,
  formLivro
};