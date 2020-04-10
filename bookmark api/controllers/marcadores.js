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
    throw{ok: false};

  }
};

let consultarMarcadores = async () => {

    let servicio = new ServicioPg();
    let sql = `SELECT * FROM public.marcadores`
    let respuesta = await servicio.ejecutarSql(sql)
    return respuesta;
  }

module.exports = {
  validarMarcador,
  guardarMarcador,
  consultarMarcadores
};
