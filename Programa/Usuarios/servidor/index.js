const express = require('express');
const conectarDB = require('./config/db');
const cors = require("cors");

// Creamos el servidor
const app = express();

//Conectamos a la BD
conectarDB();
app.use(cors());//Utilizamos el middelware cors porque tenemos en distintos puertos el Back-End y el Front-End

app.use(express.json()); //Middleware para poder enviar JSON a nuestra aplicacion

app.use('/usuarios', require('./routes/usuario')); 
//Va a usuario.js, en el url pondra usuarios, y se crea la coleccion usuarios dentro de la BD meancoches

app.listen(4500, () => {//Puerto en el que escucha el servidor
    console.log('El servidor está funcionando')
})