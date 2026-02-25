const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// CREATE
async function criarExemplar(livroId, codigoTombo) {
  if (!livroId) throw new Error("livroId não informado");
  if (!codigoTombo) throw new Error("código tombo não informado");

  return prisma.exemplar.create({
    data: {
      livro_id: BigInt(livroId),
      codigo_tombo: codigoTombo,
      status: "DISPONIVEL"
    }
  });
}

// READ (listar todos de um livro)
async function listarPorLivro(livroId) {
  if (!livroId) throw new Error("livroId não informado");
  return prisma.exemplar.findMany({
    where: { livro_id: BigInt(livroId) }
  });
}

// READ (buscar um exemplar específico)
async function buscarPorId(exemplarId) {
  if (!exemplarId) throw new Error("exemplarId não informado");
  return prisma.exemplar.findUnique({
    where: { id: BigInt(exemplarId) }
  });
}

// UPDATE (atualizar status)
async function atualizarStatus(exemplarId, novoStatus) {
  if (!exemplarId) throw new Error("exemplarId não informado");
  return prisma.exemplar.update({
    where: { id: BigInt(exemplarId) },
    data: { status: novoStatus }
  });
}

// DELETE
async function deletarExemplar(exemplarId) {
  if (!exemplarId) throw new Error("exemplarId não informado");
  return prisma.exemplar.delete({
    where: { id: BigInt(exemplarId) }
  });
}

module.exports = {
  criarExemplar,
  listarPorLivro,
  buscarPorId,
  atualizarStatus,
  deletarExemplar
};