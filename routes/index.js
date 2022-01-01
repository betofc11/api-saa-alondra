const express = require('express');
const router = express.Router();

const vecinosController = require('../controllers/vecinosController');
const regionesController = require('../controllers/regionesController');
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

    return router;
}

//mysql://badcfd9f3811c9:fa08121e@us-cdbr-east-05.cleardb.net/heroku_8aa0c53a443cbde?reconnect=true