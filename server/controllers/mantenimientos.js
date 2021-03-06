const ServicePG = require("../services/postgres");

let validar_mantenimiento = (mantenimiento) => {
  if (!mantenimiento) {
    throw {
      ok: false,
      mensaje: "La información del mantenimiento es obligatoria.",
    };
  }

  if (!mantenimiento.id_mecanico) {
    throw { ok: false, mensaje: "El id_mecanico es obligatorio." };
  }
  if (!mantenimiento.placa) {
    throw { ok: false, mensaje: "La placa es obligatoria." };
  }
  if (!mantenimiento.fecha) {
    throw { ok: false, mensaje: "La fecha es obligatoria." };
  }
};

let guardar_mantenimiento = async (mantenimiento) => {
  let _service = new ServicePG();
  let sql = `INSERT INTO public.mantenimientos(
              id_mecanico, placa, fecha, trabajos_realizados, horas_invertidas)
              VALUES (
                  $1,
                  $2,
                  $3,
                  $4,
                  $5);`;

  let values = [
    mantenimiento.id_mecanico,
    mantenimiento.placa,
    mantenimiento.fecha,
    mantenimiento.trabajos_realizados,
    mantenimiento.horas_invertidas,
  ];
  let respuesta = await _service.runSql(sql, values);
  return respuesta;
};

let consultar_mantenimientos = async () => {
  let _service = new ServicePG();
  let sql = `SELECT * FROM mantenimientos`;
  let respuesta = await _service.runSql(sql);
  return respuesta;
};

let consultar_mantenimiento = async (mantenimiento) => {
  let _service = new ServicePG();
  let sql = `SELECT * FROM mantenimientos WHERE id_mecanico = $1 AND
                                                placa = $2 AND
                                                fecha = $3`;
  let values = [
    mantenimiento.id_mecanico,
    mantenimiento.placa,
    mantenimiento.fecha,
  ];
  let respuesta = await _service.runSql(sql, values);
  return respuesta;
};

let eliminar_mantenimiento = (mantenimiento) => {
  let _service = new ServicePG();
  console.log(mantenimiento);
  let sql = `DELETE FROM mantenimientos WHERE id_mecanico = $1 AND
                                              placa = $2 AND
                                              fecha = $3`;
  let values = [
    mantenimiento.id_mecanico,
    mantenimiento.placa,
    mantenimiento.fecha,
  ];
  let respuesta = _service.runSql(sql, values);
  return respuesta;
};

let editar_mantenimiento = async (mantenimiento) => {
  console.log(mantenimiento);
  let _service = new ServicePG();
  let sql = `UPDATE mantenimientos set id_mecanico = $1,
                 placa = $2,
                 fecha = $3,
                 trabajos_realizados = $4,
                 horas_invertidas = $5
                WHERE id_mecanico = $6 AND 
                      placa = $7 AND
                      fecha = $8`;

  let values = [
    mantenimiento.id_mecanico,
    mantenimiento.placa,
    mantenimiento.fecha,
    mantenimiento.trabajos_realizados,
    mantenimiento.horas_invertidas,
    mantenimiento.id_mecanico_temp,
    mantenimiento.placa_temp,
    mantenimiento.fecha_temp,
  ];
  let respuesta = await _service.runSql(sql, values);
  return respuesta;
};
module.exports = {
  validar_mantenimiento,
  guardar_mantenimiento,
  consultar_mantenimientos,
  consultar_mantenimiento,
  eliminar_mantenimiento,
  editar_mantenimiento,
};
