const express = require('express');
const routes = require('./routes');
const config = require("./config.json");


//Consiguiendo el puerto
const PORT = process.env.PORT || 4000;

//Creando el servidor
const app = express();


// HABILITAR BODYPARSER 
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    next();
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas
app.use("/", routes());

// Listener
app.listen(PORT, () => {
    console.log("LISTENING ON PORT:", PORT);
})