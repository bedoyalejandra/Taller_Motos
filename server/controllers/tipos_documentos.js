
const ServicePG = require("../services/postgres");


let validar_tipo_documento = tipo_documento => {
  if (!tipo_documento) {
    throw {
      ok: false,
      mensaje: "La información del tipo_documento es obligatoria."
    };
  }

  if (!tipo_documento.nombre) {
    throw { ok: false, mensaje: "El nombre es obligatorio." };
  }

};

let guardar_tipo_documento = async tipo_documento => {
  let _service = new ServicePG();
  let sql = `INSERT INTO public.tipos_documentos(
              nombre)
              VALUES (
                  $1
                  );`;

  let values = [
    tipo_documento.nombre,
  ]
  let respuesta = await _service.runSql(sql, values);
  return respuesta;
};

let consultar_tipos_documentos = async () => {
  let _service = new ServicePG();
  let sql = `SELECT * FROM tipos_documentos`;
  let respuesta = await _service.runSql(sql);
  return respuesta;
};

let consultar_tipo_documento = async (id) => {
  let _service = new ServicePG();
  let sql = `SELECT * FROM tipos_documentos WHERE id = '${id}'`;
  let respuesta = await _service.runSql(sql);
  return respuesta;
};

let eliminar_tipo_documento = id => {
    let _service = new ServicePG();
    let sql = `DELETE FROM tipos_documentos WHERE id= $1`;
    let values = [
      id
    ]
    let respuesta = _service.runSql(sql, values);
    return respuesta;
};

let editar_tipo_documento = async (tipo_documento, id) => {
    let _service = new ServicePG();
    let sql = `UPDATE tipos_documentos set nombre = $1,
                WHERE id = $2`;

    let values = [
      tipo_documento.nombre,
      id
    ]
    let respuesta = await _service.runSql(sql, values);
    return respuesta;
};
module.exports = { validar_tipo_documento,
                    guardar_tipo_documento,
                    consultar_tipos_documentos,
                    consultar_tipo_documento,
                    eliminar_tipo_documento,
                    editar_tipo_documento };
