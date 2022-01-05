const { PrismaClient } =  require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

exports.obtieneUsuarios = async (req, res, next) => {
    try {
        const usuarios = await prisma.region.findMany();
        res.json(regiones);
    } catch (e) {
        console.log(e.message);
        res.json({ error: 'ERROR: ' + e.message });
        res.status(502)
        next();
    }

}

exports.creaUsuario = async () =>{

}