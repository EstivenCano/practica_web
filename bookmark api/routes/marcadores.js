const express = require("express");
const router = express.Router();

const {
  validarMarcador,
  guardarMarcador,
  consultarMarcadores,
  eliminarMarcador, 
  consultarMarcador,
  modificarMarcador
} = require("../controllers/marcadores");


/**
 * Obtener todos los marcadores
 */
router.get("/marcadores", (req, res) => {

  let filtros = req.query;

  consultarMarcadores(filtros).then(respuestaDB => {
    let registros = respuestaDB.rows;
    res.send({
      ok: true,
      info: registros,
      mensaje: 'Marcadores consultados'
    });
  }).catch(error => {
    res.send(error);
  });
});

router.post("/marcadores", (req, res) => {

  try {
    //Capturar el body desde la solicitud
    let info_marcador = req.body;
    //Validar la informacion, si hay un error se envia al catch
    console.log(info_marcador);
    validarMarcador(info_marcador);

    //Guardar la persona en base de datos
    guardarMarcador(info_marcador).then(respuestaDB => {
      res.send({
        ok: true,
        mensaje: "Marcador guardado",
        info: info_marcador
      });
    }).catch(error => {
      res.send(error);
    })

    //Responder 

  } catch (error) {
    res.send(error);
  }

});

/**
 * Eliminar un marcador según su ID
 */
router.delete("/marcadores/:id", (req, res) => {
  
  let id = req.params.id;
  eliminarMarcador(id).then(respuestaDB => {
    res.send({
      ok: true,
      info: {},
      mensaje: 'Marcador eliminado'
    });
  }).catch(error => {
    res.send(error);
  });
});

/**
 * Consultar marcador específico por ID
 */
router.get("/marcadores/:id", (req, res) => {
  let id = req.params.id;
  consultarMarcador(id).then(respuestaDB => {
    let registros = respuestaDB.rows;
    let mensaje = registros.length > 0 ? 'Marcador consultado.' : 'Sin registro.';
    res.send({
      ok: true,
      info: registros, 
      mensaje: mensaje
    });
  }).catch(error => {
    res.send(error);
  });
});

/**
 * Modificar marcador según su ID
 */
router.put("/marcadores/:id",(req,res) =>{
  //Capturar el parámetro de la ruta
  let id = req.params.id;

  let marcador = req.body;
  
  modificarMarcador(marcador,id).then(respuestaDB => {
    res.send({ok:true , mensaje: "Marcador modificado", info: respuestaDB})
  }).catch(error => {
    res.send({ok:false , mensaje: "No se pudo modificar el marcador", info: error})
  })
})




module.exports = router;
