const { z } = require("zod");

const LivroSchema = z.object({
    titulo: z.string().max(200),
    autor: z.string().max(150),
    ano_publicacao: z.coerce.number().optional(), // coerce converte string para number
    genero: z.string().max(100).optional(),
    isbn: z.string().max(20) // obrigatório
});

module.exports = LivroSchema;