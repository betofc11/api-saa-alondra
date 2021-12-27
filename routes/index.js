const express = require('express');
const router = express.Router();

const vecinosController = require('../controllers/vecinosController');

module.exports = () => {

    router.post('/vecinos/agregaVecino', vecinosController.agregaVecino);

    router.get('/vecinos', vecinosController.obtieneVecinos)

    return router;
}