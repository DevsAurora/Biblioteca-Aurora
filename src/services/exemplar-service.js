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

async function criarExemplar(livroId, codigoTombo) {
  return prisma.exemplar.create({
    data: {
      codigo_tombo: codigoTombo,   // cuidado: no schema o campo é codigo_tombo
      livro_id: BigInt(livroId),
      status: "DISPONIVEL"
    }
  });
}

module.exports = { listarPorLivro, atualizarStatus, criarExemplar };