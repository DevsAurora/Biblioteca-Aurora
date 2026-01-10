/** esse arquivo faz a validação dos schemas 
 * usando o Zod. a validação é feita pelo schema passado como parâmetro
 * é generico, então aceita qualquer schema */

function validarSchema(schema) {
    return (req, res, next) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (err) {
            return res.status(400).json({
                message: "Erro de validação",
                errors: err.errors,
            });
        }
    };
}

module.exports = validarSchema;