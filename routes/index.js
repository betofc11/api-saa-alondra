const express = require('express');
const router = express.Router();

const vecinosController = require('../controllers/vecinosController');
const regionesController = require('../controllers/regionesController');
const casasController = require('../controllers/casasController');
const usuariosController = require('../controllers/usuariosController');

module.exports = () => {

    // VECINOS METHODS ----------------------------------------------
    router.post('/vecinos/agregaVecino/', vecinosController.agregaVecino);

    router.put('/vecinos/editaVecino/', vecinosController.editaVecino);

    router.delete('/vecinos/eliminaVecino/:id', vecinosController.eliminaVecino);

    router.get('/vecinos/', vecinosController.obtieneVecinos);

    router.get('/vecinos/getById/:id', vecinosController.obtieneVecinoById);

    router.get('/vecinos/getByRegion/:idregion', vecinosController.obtieneVecinosByRegion);


    // REGIONES METHODS ----------------------------------------------
    router.get('/regiones/', regionesController.obtieneRegiones);

    router.get('/regiones/:id', regionesController.obtieneRegionById);

    router.post('/regiones/', regionesController.agregaRegion);

    router.put('/regiones/', regionesController.editaRegion);

    router.delete('/regiones/:idregion', regionesController.eliminaRegion);

    // CASAS METHODS -------------------------------------------------
    router.get('/casas/', casasController.obtieneCasas);

    router.get('/casas/:id', casasController.obtieneCasaById);

    router.post('/casas/', casasController.agregaCasa);

    router.put('/casas/', casasController.editaCasa);

    router.delete('/casas/:idcasa', casasController.eliminaCasa);

    
    // USUARIOS METHODS -------------------------------------------

    router.get('/usuarios/', usuariosController.obtieneUsuarios);
    router.get('/usuarios/:id', usuariosController.obtieneUsuarioById);
    router.post('/usuarios/', usuariosController.creaUsuario);
    router.post('/usuarios/login', usuariosController.iniciaSesion);
    router.post('/usuarios/islogged', usuariosController.veryfyLogin);
    router.delete('/usuarios/:id', usuariosController.eliminaUsuario);


    return router;
}

//mysql://badcfd9f3811c9:fa08121e@us-cdbr-east-05.cleardb.net/heroku_8aa0c53a443cbde?reconnect=true