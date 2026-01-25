const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const usuarioService = require('../src/services/usuario-service');

const prisma = new PrismaClient();

describe("Usuário Service", () => {
  let usuarioCriado;

  beforeAll(async () => {
    // limpa a tabela antes dos testes
    await prisma.usuario.deleteMany();
  });

  afterAll(async () => {
    // limpa depois dos testes
    await prisma.usuario.deleteMany();
    await prisma.$disconnect();
  });

  test("deve criar um usuário com senha criptografada", async () => {
    usuarioCriado = await usuarioService.criarUsuario({
      nome: "Tiago",
      sobrenome: "Teste",
      email: "tiago@teste.com",
      senha: "123456",
      role: "ALUNO"
    });

    expect(usuarioCriado).toHaveProperty("id");
    expect(usuarioCriado.nome).toBe("Tiago");
    expect(usuarioCriado.email).toBe("tiago@teste.com");

    // valida se a senha foi criptografada
    const senhaCorreta = await bcrypt.compare("123456", usuarioCriado.senha);
    expect(senhaCorreta).toBe(true);
  });

  test("deve buscar o usuário criado pelo ID", async () => {
    const encontrado = await usuarioService.buscarUsuarioPorId(usuarioCriado.id);
    expect(encontrado).not.toBeNull();
    expect(encontrado.email).toBe("tiago@teste.com");
  });

  test("deve listar usuários", async () => {
    const usuarios = await usuarioService.listarUsuarios();
    expect(usuarios.length).toBeGreaterThan(0);
    expect(usuarios[0].email).toBe("tiago@teste.com");
  });
});