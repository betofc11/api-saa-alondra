const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.obtieneRegiones = async (req, res, next) => {
    try {
        const regiones = await prisma.region.findMany();
        res.json(regiones);
    } catch (e) {
        console.log(e.message);
        res.json({ error: 'ERROR: ' + e.message });
        res.status(502)
        next();
    }

}

exports.obtieneRegionById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const regiones = await prisma.region.findUnique({
            where: {
                idregion: id
            }
        });
        res.json(regiones);
    } catch (e) {
        console.log(e.message);
        res.json({ error: 'ERROR: ' + e.message });
        res.status(502);
        next();
    }
}

exports.agregaRegion = async (req, res, next) => {
    try {
        const { nombre, regioneslist } = req.body;
        if (!!regioneslist) {
            const regiones = await prisma.region.createMany({
                data: regioneslist
            });
            res.json(regiones);
        } else {
            const region = await prisma.region.create({
                data: {
                    nombre: nombre
                }
            });
            res.json(region);
        }
    } catch (e) {
        console.log(e.message);
        res.json({ error: 'ERROR: ' + e.message });
        res.status(502);
        next();
    }
}

exports.editaRegion = async (req, res, next) => {
    try {
        const { nombre, idregion } = req.body;
        const region = await prisma.region.update({ 
            where:{
                idregion: idregion
            },
            data:{
                nombre: nombre
            }
        });
        res.json(region);
    } catch (e) {
        console.log(e.message);
        res.json({ error: 'ERROR: ' + e.message });
        res.status(502);
        next();
    }
}

exports.eliminaRegion = async (req, res, next) => {
    try {
        const id = req.params.idregion;
        const region = await prisma.region.delete({ 
            where:{
                idregion: id
            }
        });
        res.json(region);
    } catch (e) {
        console.log(e.message);
        res.json({ error: 'ERROR: ' + e.message });
        res.status(502);
        next();
    }
}