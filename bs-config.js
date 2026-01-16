module.exports = {
  proxy: "http://localhost:3000",        // seu servidor Express
  files: ["src/views/**/*.ejs", "public/css/**/*.css", "public/js/**/*.js"],
  ignore: ["node_modules", "logs", "tmp"],
  port: 3001,                             // porta do BrowserSync
  open: true,                             // abre o navegador
  reloadDelay: 800,                       // espera o nodemon subir
  reloadDebounce: 500,                    // evita múltiplos reloads em sequência
  watchEvents: ["change", "add", "unlink"],
  watchOptions: { ignoreInitial: false },
  ghostMode: false                        // evita sync de cliques/scroll atrapalhando testes
};