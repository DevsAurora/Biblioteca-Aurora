/** esse arquivo faz a validação dos schemas 
 * usando o Zod. a validação é feita pelo schema passado como parâmetro
 * é generico, então aceita qualquer schema */
function validarSchema(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const detalhes = result.error.issues.map(err => ({
        campo: err.path.join('.'),
        mensagem: err.message
      }));
      return res.status(400).json({
        message: "Erro de validação nos campos",
        detalhes
      });
    }

    // sobrescreve req.body com os dados já convertidos
    req.body = result.data;
    next();
  };
}
module.exports = validarSchema;