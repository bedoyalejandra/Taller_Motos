const ServicePG = require("../services/postgres");
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImp0aSI6ImY2NzkxOWU3LTA0NDItNDI4ZC1iZWFlLWYzMjMyODBlNDFmZCIsImlhdCI6MTU5MDA5ODQxMiwiZXhwIjoxNTkwMTAyMDEyfQ.KJmynbjBYVdRF1GHyd7jjplptBqQ_VWdmMM3L5e3gps';

let validar_datos = (usuario) => {
  if (!usuario) {
    throw {
      ok: false,
      message: "La información es obligatoria.",
    };
  }

  if (!usuario.documento) {
    throw { ok: false, message: "El documento es obligatorio." };
  }
  if (!usuario.clave) {
    throw { ok: false, message: "La clave es obligatoria." };
  }

}

let consultar_usuario = async (usuario) => {
  let _service = new ServicePG();
  let sql = `SELECT * FROM usuarios WHERE documento = $1 AND clave = md5($2)`;
  let values = [usuario.documento, usuario.clave]
  let respuesta = await _service.runSql(sql, values);
  return respuesta;
};


  let generar_token = (usuario) =>{
    delete usuario.clave;
    let token = jwt.sign(usuario, SECRET_KEY, {expiresIn: "4h"});
    return token;
  }

  let descifrar_token = (token) => {
    return jwt.decode(token, SECRET_KEY);      
  }

  let validar_token = (token) => {
    return jwt.verify(token, SECRET_KEY);
  }

module.exports = { validar_datos, generar_token, validar_token, descifrar_token, consultar_usuario };
