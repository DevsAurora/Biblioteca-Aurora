const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function criarUsuario(data) {
    const senhaHash = await bcrypt.hash(data.senha, 10);
    return prisma.usuario.create({
        data: {
            nome: data.nome,
            sobrenome: data.sobrenome,
            email: data.email,
            senha: senhaHash,
            role: data.role || 'ALUNO'
        }
    });
}

async function listarUsuarios() {
    return prisma.usuario.findMany();
}

async function buscarUsuarioPorId(id) {
    return prisma.usuario.findUnique({
        where: { id: Number(id) }
    });
}

async function atualizarUsuario(id, data) {
    return prisma.usuario.update({
        where: { id: Number(id) },
        data
    });
}

async function deletarUsuario(id) {
    return prisma.usuario.delete({
        where: { id: Number(id) }
    });
}

module.exports = {
    criarUsuario,
    listarUsuarios,
    buscarUsuarioPorId,
    atualizarUsuario,
    deletarUsuario
}