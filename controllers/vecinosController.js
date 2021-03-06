const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const { type } = require('express/lib/response');

const prisma = new PrismaClient();

exports.agregaVecino = async (req, res, next) => {
    try {
        let { nombre, primerapellido, segundoapellido, cedula, fallecido, fechanac, idcasa, email, trabaja, telefono, vecinoslist } = req.body;
        if (!!vecinoslist) {
            const vecino = await prisma.vecino.createMany({
                data: vecinoslist
            });
            res.json(vecino);
        } else if (fallecido != null && idcasa != null && trabaja != null && nombre != null && primerapellido != null && cedula != null) {

            const vecino = await prisma.vecino.create({
                data: {
                    nombre: nombre,
                    primerapellido: primerapellido,
                    segundoapellido: segundoapellido,
                    cedula: cedula,
                    fallecido: fallecido,
                    fechanac: fechanac,
                    idcasa: idcasa,
                    email: email,
                    trabaja: trabaja,
                    telefono: telefono
                }
            });
            res.json(vecino);
        } else {
            next();
        }
    } catch (e) {
        console.log(e.message);
        res.json({ mensaje: "Ocurrio un error: " + e.message });
        next(e);
    }
}

exports.editaVecino = async (req, res, next) => {
    try {
        const { idvecino, nombre, primerapellido, segundoapellido, cedula, fallecido, fechanac, casa, email, trabaja, telefono, vecinoslist } = req.body;

        if (!!vecinoslist) {
            let result = [];

            for (const vecino of vecinoslist) {
                const vecinosedited = await prisma.vecino.update({
                    where: {
                        idvecino: vecino.idvecino
                    },
                    data: vecino
                });
                result.push(vecinosedited);
            }

            res.json(result);

        } else if (idvecino != null && fallecido != null && casa != null && trabaja != null && nombre != null && primerapellido != null && cedula != null) {
            const vecinoedited = await prisma.vecino.update({
                where: {
                    idvecino: idvecino
                },
                data: {
                    nombre: nombre,
                    primerapellido: primerapellido,
                    segundoapellido: segundoapellido,
                    cedula: cedula,
                    fallecido: fallecido,
                    fechanac: fechanac,
                    idcasa: casa,
                    email: email,
                    trabaja: trabaja,
                    telefono: telefono
                }
            });

            res.json(vecinoedited);
        } else {
            next();
            throw "ERROR";
        }

    } catch (e) {
        console.log(e.message);
        res.json({ mensaje: "Ocurrio un error: " + e.message });
        next();
    }
}

exports.obtieneVecinos = async (req, res, next) => {
    try {
        const vecino = await prisma.vecino.findMany();
        res.json(vecino);
    } catch (e) {
        console.log(e.message);
        res.json({ mensaje: "Ocurrio un error: " + e.message });
        next();
    }
}

exports.obtieneVecinoById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const vecino = await prisma.vecino.findUnique({
            where: {
                idvecino: id
            }
        });
        res.json(vecino);
    } catch (e) {
        console.log(e.message);
        res.json({ mensaje: "Ocurrio un error: " + e.message });
        next();
    }
}

exports.obtieneVecinosByCasa = async (req, res, next) => {
    try {
        const id = parseInt(req.params.idcasa);
        const vecino = await prisma.vecino.findMany({
            where: {
                idcasa: id
            }
        });
        res.json(vecino);
    } catch (e) {
        console.log(e.message);
        res.json({ mensaje: "Ocurrio un error: " + e.message });
        next();
    }
}

exports.obtieneVecinosByRegion = async (req, res, next) => {
    try {
        const id = parseInt(req.params.idregion);
        const casas = await prisma.casa.findMany({
            where: {
                idregion: id
            }
        });
        let listCasas = [];
        let vecinos = [];
        for (const list of casas) {
            listCasas.push(list.idcasa);
        }
        for (const list of listCasas) {
            const a = await prisma.vecino.findMany({
                where: {
                    idcasa: list
                }
            });
            for (const b of a) {
                vecinos.push(b);
            }
        }
        res.json(vecinos);
    } catch (e) {
        console.log(e.message);
        res.json({ mensaje: "Ocurrio un error: " + e.message });
        next();
    }
}

exports.eliminaVecino = async (req, res, next) =>{
    try {
        const id = parseInt(req.params.id);
        const vecino = await prisma.vecino.delete({
            where: {
                idvecino: id
            }
        });
        res.json(vecino);
    } catch (e) {
        console.log(e.message);
        res.json({ mensaje: "Ocurrio un error: " + e.message });
        next();
    }
}