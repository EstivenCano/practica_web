//Importar express

const express = require("express")

//Inicializar la libreria 
const app = express()
app.use(express.json())


app.get("/",(req,res)=>{

    res.send("API Bookmarks");

}); 

//Importar las rutas con los endpoints especificos
const rutas_marcadores = require('./routes/marcadores')
app.use(rutas_marcadores)

//Puerto
const port = 3000
//Levantar el servidor para escuchar los puertos
app.listen(port,() =>{
    console.log(`Escuchando API en http://localhost:${port}`)
})



