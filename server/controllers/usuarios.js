const ServicePG = require("../services/postgres");

let validar_usuario = (usuario) => {
  if (!usuario) {
    throw {
      ok: false,
      mensaje: "La información de la persona es obligatoria.",
    };
  }

  if (!usuario.documento) {
    throw { ok: false, mensaje: "La cédula es obligatoria." };
  }
  if (!usuario.nombre) {
    throw { ok: false, mensaje: "El nombre es obligatorio." };
  }
  if (!usuario.apellidos) {
    throw { ok: false, mensaje: "Los apellidos son obligatorios." };
  }
  if (!usuario.celular) {
    throw { ok: false, mensaje: "El celular es obligatorio." };
  }
  if (!usuario.correo) {
    throw { ok: false, mensaje: "El correo es obligatorio." };
  }
  if (!usuario.rol) {
    throw { ok: false, mensaje: "El rol es obligatorio." };
  }
  if (!usuario.clave) {
    throw { ok: false, mensaje: "La contraseña es obligatoria." };
  }
};

let guardar_usuario = async (usuario) => {
  let _service = new ServicePG();
  let sql = `INSERT INTO public.usuarios(
              tipo_documento, documento, nombre, apellidos, celular, correo, rol, clave)
              VALUES (
                  $1,
                  $2,
                  $3,
                  $4,
                  $5,
                  $6,
                  $7,
                  md5($8)
                  );`;

  let values = [
    usuario.tipo_documento,
    usuario.documento,
    usuario.nombre,
    usuario.apellidos,
    usuario.celular,
    usuario.correo,
    usuario.rol,
    usuario.clave,
  ];

  let respuesta = await _service.runSql(sql, values);
  return respuesta;
};

let ver_usuario = async () => {
  let _service = new ServicePG();
  let sql = `SELECT  usuarios.tipo_documento, usuarios.documento, usuarios.nombre, usuarios.apellidos, usuarios.celular, usuarios.correo, roles.nombre as "rol" FROM usuarios INNER JOIN roles on usuarios.rol = roles.documento;`;
  let respuesta = await _service.runSql(sql);
  let result = respuesta.rows
  return result;
};

let consultar_usuarios = async () => {
  let _service = new ServicePG();
  let sql = `SELECT usuarios.tipo_documento, usuarios.documento, usuarios.nombre, usuarios.apellidos, usuarios.celular, usuarios.correo, usuarios.rol FROM usuarios`;
  let answer = await _service.runSql(sql);
  return answer;
};

let consultar_usuario = async (documento) => {
  let _service = new ServicePG();
  let sql = `SELECT usuarios.tipo_documento, usuarios.documento, usuarios.nombre, usuarios.apellidos, usuarios.celular,
   usuarios.correo, usuarios.rol,
    usuarios.clave FROM usuarios WHERE documento = '${documento}'`;
  let respuesta = await _service.runSql(sql);
  return respuesta;
};

let eliminar_usuario = (documento) => {
  let _service = new ServicePG();
  let sql = `DELETE FROM usuarios WHERE documento = $1`;
  let values = [documento]
  let respuesta = _service.runSql(sql, values);
  return respuesta;
};

let editar_usuario = async (usuario, documento) => {
  let _service = new ServicePG();
  let sql = `UPDATE usuarios set tipo_documento = $1,
                nombre = $2,
                 apellidos = $3,
                 celular = $4,
                 correo = $5,
                 rol = $6
                 WHERE documento = $7`;

  let values = [
    usuario.tipo_documento,
    usuario.nombre,
    usuario.apellidos,
    usuario.celular,
    usuario.correo,
    usuario.rol,
    documento
  ]
  let respuesta = await _service.runSql(sql, values);
  return respuesta;
};

let editar_clave = async (clave, documento) => {
  
  let _service = new ServicePG();
  let sql = `UPDATE usuarios set
                 clave = md5($1)
                 WHERE documento= $2`;

  let values = [
    clave.clave_nueva,
    documento
  ]
  let respuesta = await _service.runSql(sql, values);
  return respuesta;
};


module.exports = {
  validar_usuario,
  guardar_usuario,
  consultar_usuarios,
  consultar_usuario,
  eliminar_usuario,
  editar_usuario,
  ver_usuario,
  editar_clave,
};
