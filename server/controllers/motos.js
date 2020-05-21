const ServicePG = require("../services/postgres");

let validar_moto = (moto) => {
  if (!moto) {
    throw {
      ok: false,
      mensaje: "La información de la moto es obligatoria.",
    };
  }

  if (!moto.placa) {
    throw { ok: false, mensaje: "La cédula es obligatoria." };
  }
  if (!moto.estado) {
    throw { ok: false, mensaje: "El estado es obligatorio." };
  }
  if (!moto.clase) {
    throw { ok: false, mensaje: "La clase es obligatoria." };
  }
  if (!moto.marca) {
    throw { ok: false, mensaje: "El marca es obligatorio." };
  }
  if (!moto.modelo) {
    throw { ok: false, mensaje: "El modelo es obligatorio." };
  }
  if (!moto.color) {
    throw { ok: false, mensaje: "El color es obligatorio." };
  }
  if (!moto.cilindraje) {
    throw { ok: false, mensaje: "El cilindraje es obligatorio." };
  }
  if (!moto.id_propietario) {
    throw { ok: false, mensaje: "El soat es obligatorio." };
  }
  if (!moto.nro_soat) {
    throw { ok: false, mensaje: "El soat es obligatorio." };
  }
  if (!moto.vencimiento_soat) {
    throw {
      ok: false,
      mensaje: "La fecha de vencimiento del soat es obligatoria.",
    };
  }
  if (!moto.nro_tecnomecanica) {
    throw { ok: false, mensaje: "El chequeo técnicomecanico es obligatorio." };
  }
  if (!moto.vencimiento_tecnomecanica) {
    throw {
      ok: false,
      mensaje:
        "La fecha de vencimiento del chequeo técnicomecanico es obligatoria.",
    };
  }
};

let guardar_moto = async (moto) => {
  let _service = new ServicePG();
  let sql = `INSERT INTO public.motos(placa, estado, clase, marca, modelo, color, cilindraje, id_propietario, nro_soat, vencimiento_soat, nro_tecnomecanica, vencimiento_tecnomecanica)
              VALUES (
                  $1,
                  $2,
                  $3,
                  $4,
                  $5,
                  $6,
                  $7,
                  $8,
                  $9,
                  $10,
                  $11,
                  $12);`;

  let values = [
    moto.placa,
    moto.estado,
    moto.clase,
    moto.marca,
    moto.modelo,
    moto.color,
    moto.cilindraje,
    moto.id_propietario,
    moto.nro_soat,
    moto.vencimiento_soat,
    moto.nro_tecnomecanica,
    moto.vencimiento_tecnomecanica,
  ];

  let respuesta = await _service.runSql(sql, values);
  return respuesta;
};

let ver_moto = async () => {
  let _service = new ServicePG();
  let sql = `motos.placa, motos.estado, motos.clase, motos.marca, motos.modelo, motos.color, motos.cilindraje, usuario.nombre as "Propietario"  FROM motos INNER JOIN usuarios on motos.id_propietario = usuarios.documento;`;
  let respuesta = await _service.runSql(sql);
  let result = respuesta.rows;
  return result;
};

let consultar_motos = async () => {
  let _service = new ServicePG();
  let sql = `SELECT * FROM motos`;
  let answer = await _service.runSql(sql);
  return answer;
};

let consultar_moto = async (placa) => {
  let _service = new ServicePG();
  let sql = `SELECT * FROM motos WHERE placa = '${placa}'`;
  let respuesta = await _service.runSql(sql);
  return respuesta;
};

let eliminar_moto = (placa) => {
  let _service = new ServicePG();
  let sql = `DELETE FROM motos WHERE placa = $1`;
  let values = [placa];
  let respuesta = _service.runSql(sql, values);
  return respuesta;
};

let editar_moto = async (moto, placa) => {
  let _service = new ServicePG();
  let sql = `UPDATE motos set 
                estado = $1,
                 clase = $2,
                 marca = $3,
                 modelo = $4,
                 color = $5,
                 cilindraje = $6,
                 id_propietario = $7,
                 nro_soat = $8,
                 vencimiento_soat = $9,
                 nro_tecnomecanica = $10,
                 vencimiento_tecnomecanica = $11,
                 WHERE placa= $12`;

  let values = [
    moto.estado,
    moto.clase,
    moto.marca,
    moto.modelo,
    moto.color,
    moto.cilindraje,
    moto.id_propietario,
    moto.nro_soat,
    moto.vencimiento_soat,
    moto.nro_tecnomecanica,
    moto.vencimiento_tecnomecanica,
    placa,
  ];
  let respuesta = await _service.runSql(sql, values);
  return respuesta;
};


module.exports = {
  validar_moto,
  guardar_moto,
  consultar_motos,
  consultar_moto,
  eliminar_moto,
  editar_moto,
  ver_moto,
};
