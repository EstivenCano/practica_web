const express = require("express");
const router = express.Router();

const {
  validarMarcador,
  guardarMarcador,
  consultarMarcadores
} = require("../controllers/marcadores");


/**
 * Obtener todos los marcadores
 */
router.get("/marcadores", (req, res) => {
  consultarMarcadores().then(respuestaDB => {
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

module.exports = router;
