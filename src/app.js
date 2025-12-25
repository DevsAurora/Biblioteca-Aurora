const express = require('express'); 
const app = express();
const port = 3000;

const path = require('path'); 

// Configuração do motor de templates
app.set('view engine', 'ejs'); 
// Define o diretório onde ficam as views (templates EJS)
app.set('views', path.join(__dirname, 'views'));

// Middleware para servir arquivos estáticos (CSS, JS, imagens)
app.use(express.static('public')); 

// Rotas principais da aplicação
const homeRoutes = require('./routes/home');

// Usa as rotas definidas
app.use('/', homeRoutes);

// Inicializa o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
