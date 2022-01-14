const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.obtieneCasas = async (req, res, next) => {
    try {
        const casas = await prisma.casa.findMany();
        res.json(casas);
    } catch (e) {
        console.error('ERROR:',e.message); 
        res.json({ error: 'ERROR: ' + e.message });
    }
}

exports.obtieneCasaById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const casas = await prisma.casa.findUnique({
            where: {
                idcasa: id
            }
        });
        res.json(casas);
    } catch (e) {
        console.log(e.message);
        res.json({ error: 'ERROR: ' + e.message });
        res.status(502);
        next();
    }
}

exports.agregaCasa = async (req, res, next) => {
    try {
        const { nombre, casaslist, idregion, telefono } = req.body;
        if (!!casaslist) {
            const casas = await prisma.casa.createMany({
                data: casaslist
            });
            res.json(casas);
        } else {
            const casa = await prisma.casa.create({
                data: {
                    nombre: nombre,
                    idregion: idregion,
                    telefono: telefono
                }
            });
            res.json(casa);
        }
    } catch (e) {
        console.log(e.message);
        res.json({ error: 'ERROR: ' + e.message });
        res.status(502);
        next();
    }
}

exports.editaCasa = async (req, res, next) => {
    try {
        const { nombre, idcasa, idregion, telefono } = req.body;
        const casa = await prisma.casa.update({ 
            where:{
                idcasa: idcasa
            },
            data: { 
                nombre: nombre,
                telefono: telefono,
                idregion: idregion
            }
        });
        res.json(casa);
    } catch (e) {
        console.log(e.message);
        res.json({ error: 'ERROR: ' + e.message });
        res.status(502);
        next();
    }
}

exports.eliminaCasa = async (req, res, next) => {
    try {
        const id = parseInt(req.params.idcasa);
        const casa = await prisma.casa.delete({ 
            where:{
                idcasa: id
            }
        });
        res.json(casa);
    } catch (e) {
        console.log(e.message);
        res.json({ error: 'ERROR: ' + e.message });
        res.status(502);
        next();
    }
}