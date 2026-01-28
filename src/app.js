const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3000;

const path = require('path'); 
app.use(cookieParser());

// Configuração do EJS como motor de visualização
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Midlewares globais
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas principais da aplicação
const homeRoutes = require('./routes/homeRoutes');
const livroRoutes = require('./routes/livros-routes');
const usuarioRoutes = require('./routes/usuarios-routes');
const authRoutes = require("./routes/auth-routes");
const exemplaresRoutes = require("./routes/exemplar-routes");
const emprestimoRoutes = require("./routes/emprestimo-routes");
const { Prisma } = require('@prisma/client');

// Usa as rotas definidas
app.use('/', homeRoutes);
app.use('/livros', livroRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/auth', authRoutes);
app.use('/exemplares', exemplaresRoutes);
app.use('/emprestimos', emprestimoRoutes);

// Inicializa o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});