const express = require("express");
const router = express.Router();

const {
  validar_mantenimiento,
  guardar_mantenimiento,
  consultar_mantenimientos,
  consultar_mantenimiento,
  eliminar_mantenimiento,
  editar_mantenimiento,
} = require("../controllers/mantenimientos");

/**
 * Obtener todos los mantenimientos
 */
router.get("/mantenimientos", (req, res) => {

    consultar_mantenimientos()
      .then((answerDB) => {
        let records = answerDB.rows;
        res.send({
          ok: true,
          info: records,
          mensaje: "mantenimientos consultados",
        });
      })
      .catch((error) => {
        res.send(error);
      });
  
});

/**
 * Obtener un mantenimiento
 */
router.post("/mantenimiento", (req, res) => {
  let info_mantenimiento = req.body;
  if (req.body.id_mecanico) {
    consultar_mantenimiento(info_mantenimiento)
      .then((answerDB) => {
        let records = answerDB.rows;
        res.send({
          ok: true,
          info: records,
          mensaje: "Mantenimiento consultado",
        });
      })
      .catch((error) => {
        res.send(error);
      });
  } else {
    Console.log("Ingrese los datos del mantenimiento a buscar")
  }
});


/**
 * Guardar un mantenimiento
 */
router.post("/mantenimientos", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let info_mantenimiento = req.body;

    // Valida la información, si hay un error se envia al catch
    validar_mantenimiento(info_mantenimiento);

    // Guardar el mantenimiento en base de datos
    guardar_mantenimiento(info_mantenimiento)
      .then((answerDB) => {
        res.send({
          ok: true,
          mensaje: "mantenimiento guardado",
          info: info_mantenimiento,
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

/**
 * Eliminar un mantenimiento
 */
router.post("/eliminar_mantenimiento", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let info_mantenimiento = req.body;

    // Elimina el mantenimiento en base de datos
    eliminar_mantenimiento(info_mantenimiento)
      .then((answerDB) => {
        res.send({
          ok: true,
          mensaje: "Mantenimiento eliminado",
          info: info_mantenimiento,
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

/**
 * Actualizar un mantenimiento
 */
router.put("/mantenimientos", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let info_mantenimiento = req.body;
    // Actualiza el mantenimiento en base de datos
    editar_mantenimiento(info_mantenimiento)
      .then((answerDB) => {
        res.send({
          ok: true,
          mensaje: "Mantenimiento editado",
          info: info_mantenimiento,
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
