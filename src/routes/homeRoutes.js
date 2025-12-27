const express = require('express');
const router = express.Router();

// Define a rota para a página inicial
router.get('/', (req, res) => {
    res.render('home', { title: 'Página Inicial'});
});

// Exporta a rota para uso em app.js
module.exports = router;