
const ServicePG = require("../services/postgres");


let consultar_consolidado = async consolidado => {
  let _service = new ServicePG();
  let sql = `SELECT usuarios.documento as "Documento", usuarios.nombre as "Nombre", usuarios.apellidos as "Apellidos", SUM(mantenimientos.horas_invertidas)
  as "Horas Trabajadas" from usuarios inner join mantenimientos on usuarios.documento = mantenimientos.id_mecanico 
  WHERE mantenimientos.fecha BETWEEN $1 AND $2 
   GROUP by usuarios.documento`;

  let values = [
    consolidado.fecha_inicial,
    consolidado.fecha_final
  ]
  let respuesta = await _service.runSql(sql, values);
  return respuesta;
};

module.exports = { consultar_consolidado };
