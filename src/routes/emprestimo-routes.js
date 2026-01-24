const express = require("express");
const router = express.Router();
const autenticar = require("../middlewares/auth");
const autorizar = require("../middlewares/authorize");
const controller = require("../controllers/emprestimo-controller");

router.get("/", autenticar, autorizar(["BIBLIOTECARIO"]), controller.listar);
router.post("/novo", autenticar, autorizar(["BIBLIOTECARIO"]), controller.registrar);
router.post("/:id/finalizar", autenticar, autorizar(["BIBLIOTECARIO"]), controller.finalizar);



module.exports = router;