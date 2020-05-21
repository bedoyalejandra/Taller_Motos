const express = require("express");
const router = express.Router();

const { validar_moto,
  guardar_moto,
  consultar_motos,
  consultar_moto,
  eliminar_moto,
  editar_moto,
  ver_moto } = require("../controllers/motos");

/**
 * Obtener todos los motos
 */
router.get("/motos", (req, res) => {
  consultar_motos()
    .then(answerDB => {
      let records = answerDB.rows;
      res.send({ ok: true, info: records, mensaje: "Motos consultadas" });
    
    })
    .catch(error => {
      res.send(error);
    });
    
});

/**
 * Obtener inner join de motos y propietarios
 */
router.get("/vista-motos", (req, res) => {
  ver_moto()
    .then(answerDB => {
      let records = answerDB;
      res.send({ ok: true, info: records, mensaje: "Inner join realizado" });
    
    })
    .catch(error => {
      res.send(error);
    });
    
});

/**
 * Obtener una sola moto
 */
router.get("/motos/:id", (req, res) => {
  let info_moto = req.params.id;
  consultar_moto(info_moto)
  .then(answerDB => {
    let records = answerDB.rows;
    res.send({ ok: true, info: records, mensaje: "Moto consultada" });
  
  })
  .catch(error => {
    res.send(error);
  });
  
});

/**
 * Guardar un moto
 */
router.post("/motos", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let info_moto = req.body;

    // Valida la información, si hay un error se envia al catch
    validar_moto(info_moto);


    // Guardar la persona en base de datos
    guardar_moto(info_moto)
      .then(answerDB => {
        res.send({ ok: true, mensaje: "Moto guardada", info: info_moto });
      })
      .catch(error => {
        res.send(error);
      });

    // Responder
  } catch (error) {
    res.send(error);
  }
  
});

/**
 * Eliminar un moto
 */
router.delete("/motos/:id", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let info_moto = req.params.id;
  
      // Elimina el moto en base de datos
      eliminar_moto(info_moto)
        .then(answerDB => {
          res.send({ ok: true, mensaje: "Moto eliminada", info: info_moto });
        })
        .catch(error => {
          res.send(error);
        });
  
      // Responder
    } catch (error) {
      res.send(error);
    }
    
  });

  /**
 * Actualizar un moto
 */
router.put("/motos/:id", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let id = req.params.id;
      let info_moto = req.body;
  
      // Actualiza el moto en base de datos

      editar_moto(info_moto, id)
        .then(answerDB => {
          res.send({ ok: true, mensaje: "Moto editada", info: info_moto });
        })
        .catch(error => {
          res.send(error);
        });
  
      // Responder
    } catch (error) {
      res.send(error);
    }
    
  });

module.exports = router;

