const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

async function registrarUsuario(dados) {
    const senhaHash = await bcrypt.hash(dados.senha, 10);
    return prisma.usuario.create({
        data: {
            nome: dados.nome,
            email: dados.email,
            senha: senhaHash,
            role: dados.role || "ALUNO"
        }
    });
}

async function login(email, senha) {
  const usuario = await prisma.usuario.findUnique({ where: { email } });
  if (!usuario) throw new Error('Usuário não encontrado');

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) throw new Error('Senha inválida');

  const token = jwt.sign(
    { id: Number(usuario.id), role: usuario.role }, //  converte aqui
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  // Converte id antes de retornar
  return { 
    token, 
    usuario: { 
      ...usuario, 
      id: Number(usuario.id) 
    } 
  };
}
module.exports = {
    registrarUsuario,
    login
};