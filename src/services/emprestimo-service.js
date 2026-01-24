const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function registrarEmprestimo(usuarioId, exemplarId, dataDevolucaoPrevista) {
  const exemplar = await prisma.exemplar.findUnique({ where: { id: BigInt(exemplarId) } });
  if (!exemplar || exemplar.status !== "DISPONIVEL") {
    throw new Error("Exemplar não disponível para empréstimo");
  }

  const emprestimo = await prisma.emprestimo.create({
    data: {
      usuario_id: BigInt(usuarioId),
      exemplar_id: BigInt(exemplarId),
      data_devolucao_prevista: new Date(dataDevolucaoPrevista)
    }
  });

  await prisma.exemplar.update({
    where: { id: BigInt(exemplarId) },
    data: { status: "EMPRESTADO" }
  });

  return emprestimo;
}

async function listarEmprestimos() {
  return prisma.emprestimo.findMany({
    where: {
      data_devolucao_real: null // só pega os que ainda não foram finalizados
    },
    orderBy: { data_emprestimo: "desc" }, // mais recentes primeiro
    include: { usuario: true, exemplar: true }
  });
}

async function finalizarEmprestimo(id) {
  const emprestimo = await prisma.emprestimo.update({
    where: { id: BigInt(id) },
    data: { data_devolucao_real: new Date() }
  });

  await prisma.exemplar.update({
    where: { id: emprestimo.exemplar_id },
    data: { status: "DISPONIVEL" }
  });

  return emprestimo;
}

module.exports = { registrarEmprestimo, listarEmprestimos, finalizarEmprestimo };