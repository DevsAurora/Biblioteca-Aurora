const { z } = require("zod");

const UsuarioSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  sobrenome: z.string().optional(),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  role: z.enum(["ALUNO", "PROFESSOR", "BIBLIOTECARIO"])
});

module.exports = UsuarioSchema;