const express = require("express");
const router = express.Router();

const { validar_tipo_documento,
    guardar_tipo_documento,
    consultar_tipos_documentos,
    consultar_tipo_documento,
    eliminar_tipo_documento,
    editar_tipo_documento } = require("../controllers/tipos_documentos");

/**
 * Obtener todos los tipos_documentos
 */
router.get("/tipos_documentos", (req, res) => {
  consultar_tipos_documentos()
    .then(answerDB => {
      let records = answerDB.rows;
      res.send({ ok: true, info: records, mensaje: "tipos_documentos consultados" });
    
    })
    .catch(error => {
      res.send(error);
    });
    
});

/**
 * Obtener un solo tipo_documento
 */
router.get("/tipos_documentos/:id", (req, res) => {
  let info_tipo_documento = req.params.id;
  consultar_tipo_documento(info_tipo_documento)
  .then(answerDB => {
    let records = answerDB.rows;
    res.send({ ok: true, info: records, mensaje: "tipo_documento consultado" });
  
  })
  .catch(error => {
    res.send(error);
  });
  
});

/**
 * Guardar un tipo_documento
 */
router.post("/tipos_documentos", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let info_tipo_documento = req.body;

    // Valida la información, si hay un error se envia al catch
    validar_tipo_documento(info_tipo_documento);

    // Guardar el tipo_documento en base de datos
    guardar_tipo_documento(info_tipo_documento)
      .then(answerDB => {
        res.send({ ok: true, mensaje: "tipo_documento guardado", info: info_tipo_documento });
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
 * Eliminar un tipo_documento
 */
router.delete("/tipos_documentos/:id", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let info_tipo_documento = req.params.id;
  
      // Elimina el tipo_documento en base de datos
      eliminar_tipo_documento(info_tipo_documento)
        .then(answerDB => {
          res.send({ ok: true, mensaje: "tipo_documento eliminado", info: info_tipo_documento });
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
 * Actualizar un tipo_documento
 */
router.put("/tipos_documentos/:id", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let id = req.params.id;
      let info_tipo_documento = req.body;
  
      // Actualiza el tipo_documento en base de datos
      editar_tipo_documento(info_tipo_documento, id)
        .then(answerDB => {
          res.send({ ok: true, mensaje: "tipo_documento editado", info: info_tipo_documento });
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

