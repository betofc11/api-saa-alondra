const express = require('express');
const router = express.Router();

const vecinosController = require('../controllers/vecinosController');

module.exports = () => {

    router.post('/vecinos/agregaVecino/', vecinosController.agregaVecino);

    router.put('/vecinos/editaVecino/', vecinosController.editaVecino);

    router.delete('/vecinos/eliminaVecino/:id', vecinosController.eliminaVecino);

    router.get('/vecinos/', vecinosController.obtieneVecinos);

    router.get('/vecinos/getById/:id', vecinosController.obtieneVecinoById);

    router.get('/vecinos/getByRegion/:idregion', vecinosController.obtieneVecinosByRegion);

    return router;
}