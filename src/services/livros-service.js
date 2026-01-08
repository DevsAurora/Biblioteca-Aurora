const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Criar livro
async function criarLivro(dados) {
  return await prisma.livro.create({
    data: dados,
  });
}

// Atualizar livro
async function atualizarLivro(id, dados) {
  return await prisma.livro.update({
    where: { id: BigInt(id) }, // BigInt em vez de parseInt
    data: dados,
  });
}

// Listar todos os livros
async function listarLivros() {
  return await prisma.livro.findMany();
}

// Buscar livro por ID
async function buscarLivroPorId(id) {
  return await prisma.livro.findUnique({
    where: { id: BigInt(id) }, // BigInt em vez de parseInt
  });
}

// Deletar livro
async function deletarLivro(id) {
  return await prisma.livro.delete({
    where: { id: BigInt(id) }, // BigInt em vez de parseInt
  });
}

module.exports = {
  criarLivro,
  atualizarLivro,
  listarLivros,
  buscarLivroPorId,
  deletarLivro,
};