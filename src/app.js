const express = require('express'); 
const app = express();
const port = process.env.PORT || 3000;

const path = require('path'); 

// Configuração do EJS como motor de visualização
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Rotas principais da aplicação
const homeRoutes = require('./routes/homeRoutes');
const livroRoutes = require('./routes/livros-routes');

// Usa as rotas definidas
app.use('/', homeRoutes);
app.use('/livros', livroRoutes);

// Inicializa o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
