/** esse arquivo faz a validação dos schemas 
 * usando o Zod. a validação é feita pelo schema passado como parâmetro
 * é generico, então aceita qualquer schema */
function validarSchema(schema) {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      // Se for erro do Zod
      if (error.issues && Array.isArray(error.issues)) {
        const detalhes = error.issues.map(err => ({
          campo: err.path.join('.'),
          mensagem: err.message
        }));
        return res.status(400).json({
          message: "Erro de validação nos campos",
          detalhes
        });
      }

      // Se for outro tipo de erro
      return res.status(400).json({
        message: "Erro inesperado",
        detalhe: error.message
      });
    }
  };
}

module.exports = validarSchema;