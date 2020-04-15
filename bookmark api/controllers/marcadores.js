/**
 * Controlador de marcadores
 */

//Importar servicio de postgres
const ServicioPg = require('../services/postgres');

/**
 * Validar la informacion del marcador
 * @param {*} marcador json del marcador
 */
let validarMarcador = (marcador) => {
  if (!marcador) {
    throw {
      ok: false,
      mensaje: "La informacion del marcador es obligatoria"
    };
  };
  if (!marcador.url) {
    throw {
      ok: false,
      mensaje: "La URL del marcador es obligatoria"
    };
  };
}

/**
 * Guardar en base de datos un marcador
 * @param {*} marcador 
 */
let guardarMarcador = async marcador => {

  try {
    let servicio = new ServicioPg();
    let sql = `INSERT INTO public.marcadores(
        nombre, url, categoria, descripcion)
        VALUES (
            '${marcador.nombre}', 
            '${marcador.url}', 
            '${marcador.categoria}', 
            '${marcador.descripcion}');`;
    let respuesta = await servicio.ejecutarSql(sql);
    return respuesta;
  } catch (error) {
    console.log("Error: ");

    console.log(error);
    throw {
      ok: false
    };

  }
};

/**
 * Metodo para consultar marcadores desde la base de datos
 */
let consultarMarcadores = async (filtros) => {

  let servicio = new ServicioPg();
  //filtro 
  let _where = "";
  let llaves = Object.keys(filtros);
  if (llaves.length < 1) {

    let sql = `SELECT * FROM public.marcadores`
    let respuesta = await servicio.ejecutarSql(sql)
    return respuesta;
  } else {

    llaves.forEach((x, i) => {
      _where += `${x} = '${filtros[x]}'`;

      if (i < llaves.length - 1) _where += "AND";
    });

    let sql = `SELECT * FROM public.marcadores WHERE ${_where}`
    let respuesta = await servicio.ejecutarSql(sql)
    return respuesta;
  }

};

/**
 * 
 * @param {*} id 
 * Consultar marcador según id
 */
let consultarMarcador = async (id) => {

  let servicio = new ServicioPg();
  let sql = `SELECT * FROM public.marcadores WHERE id = '${id}'`
  let respuesta = await servicio.ejecutarSql(sql)
  return respuesta;
};

let eliminarMarcador = async (id) => {

  let servicio = new ServicioPg();
  let sql = `DELETE FROM public.marcadores WHERE id ='${id}' `
  let respuesta = await servicio.ejecutarSql(sql)
  return respuesta;
};

let modificarMarcador = async (marcador, id) => {

  if (marcador.id != id) {
    throw {
      ok: false,
      mensaje: "El id del marcador no corresponde al enviado",
    }
  }
  let servicio = new ServicioPg();
  let sql = `UPDATE public.marcadores
   SET nombre='${marcador.nombre}', url='${marcador.url}', 
   categoria='${marcador.categoria}', descripcion='${marcador.descripcion}'
   WHERE id='${marcador.id}'; `;
  let respuesta = await servicio.ejecutarSql(sql)
  return respuesta;
}

module.exports = {
  validarMarcador,
  guardarMarcador,
  consultarMarcadores,
  eliminarMarcador,
  consultarMarcador,
  modificarMarcador
};
