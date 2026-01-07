const prisma = require('../config/db'); 

// fala direto com o banco via Prisma
class LivroService {
    async listarLivros() {
        return await prisma.livro.findMany();
    }

     async listarLivroPorId(id) {
        return await prisma.livro.findUnique({
            where: { id: Number(id) },
        });
    }

    async criarLivro(dados) {
        return await prisma.livro.create({ data: dados });
    }

    async atualizarLivro(id, dados) {
        return await prisma.livro.update({
            where: { id: Number(id) },
            data: dados,
        });
    }
    
    async deletarLivro(id) {
        return await prisma.livro.delete({
            where: { id: Number(id) },

        });
    }

    async buscarLivroPorNome(nome) {
        return await prisma.livro.findMany({
            where: {
                titulo: {
                    contains: nome, // busca parcial (case-sensitive)
                    mode: 'insensitive' // busca sem diferenciar maiúsculas de minúsculas
                },
            },
        });
    }
    
}

module.exports = new LivroService();