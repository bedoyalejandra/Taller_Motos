const express = require("express");
const router = express.Router();

const { consultar_consolidado } = require("../controllers/consolidados");

/**
 * Consultar consolidado
 */
router.post("/consolidados", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let info_consolidado = req.body;

    // Guardar el rol en base de datos
    consultar_consolidado(info_consolidado)
      .then((answerDB) => {
        let records = answerDB.rows;
        res.send({
          ok: true,
          info: records,
          mensaje: "Consolidado consultado",
        });
      })
      .catch((error) => {
        res.send(error);
      });

    // Responder
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
