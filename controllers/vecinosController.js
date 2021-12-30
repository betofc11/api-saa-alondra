const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const { type } = require('express/lib/response');

const prisma = new PrismaClient();

exports.agregaVecino = async (req, res, next) => {
    try {
        let {
            nombre, primerapellido, segundoapellido, cedula, fallecido, fechanac, casa, email, trabaja, telefono, vecinoslist } = req.body;
        if (!!vecinoslist) {
            const vecino = await prisma.vecino.createMany({
                data: vecinoslist
            });
            res.json(vecino);
        } else if (fallecido != null && casa != null && trabaja != null && nombre != null && primerapellido != null && cedula != null) {

            const vecino = await prisma.vecino.create({
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
            res.json(vecino);
        } else {
            throw 'ERROR';
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