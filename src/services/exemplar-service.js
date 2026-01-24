const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function listarPorLivro(livroId) {
  if (!livroId) throw new Error("livroId não informado");
  return prisma.exemplar.findMany({
    where: { livro_id: BigInt(livroId) }
  });
}

async function atualizarStatus(exemplarId, novoStatus) {
  if (!exemplarId) throw new Error("exemplarId não informado");
  return prisma.exemplar.update({
    where: { id: BigInt(exemplarId) },
    data: { status: novoStatus }
  });
}

module.exports = { listarPorLivro, atualizarStatus };
