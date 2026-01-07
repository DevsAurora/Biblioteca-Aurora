const express = require('express'); 
const app = express();
const port = process.env.PORT || 3000;

const path = require('path'); 

// Middleware para interpretar requisições com corpo em JSON
app.use(express.json());

// Configuração do motor de templates
app.set('view engine', 'ejs'); 
// Define o diretório onde ficam as views (templates EJS)
app.set('views', path.join(__dirname, 'views'));

// Middleware para servir arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, 'public'))); 

// Rotas principais da aplicação
const homeRoutes = require('./routes/homeRoutes');
const livroRoutes = require('./routes/livroRoutes');
// Usa as rotas definidas
app.use('/', homeRoutes);
app.use('/livros', livroRoutes);

// Inicializa o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
