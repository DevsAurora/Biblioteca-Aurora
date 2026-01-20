function autorizar(rolesPermitidos = []) {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    if (!rolesPermitidos.includes(req.usuario.role)) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    next();
  };
}

module.exports = autorizar;