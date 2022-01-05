const { PrismaClient } =  require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config.json');

const prisma = new PrismaClient();

exports.obtieneUsuarios = async (req, res, next) => {
    try {
        const usuarios = await prisma.usuario.findMany();
        res.json(usuarios);
    } catch (e) {
        console.log(e.message);
        res.status(401).json({ error: 'ERROR: ' + e.message });
        next();
    }

}

exports.obtieneUsuarioById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const usuarios = await prisma.usuario.findUnique({
            where:{
                idusuario: id
            }
        });
        res.json(usuarios);
    } catch (e) {
        console.log(e.message);
        res.status(401).json({ error: 'ERROR: ' + e.message });
        next();
    }

}

exports.creaUsuario = async (req, res, next) =>{
    try {
        const {usuario, nombre, primerapellido, segundoapellido, admin, telefono, password, confirmedPassword, email} = req.body;
        const passwordHashed = password === confirmedPassword
        ? await bcrypt.hash(password, 10)
        : {
            error: 'Password or username incorrect'
        };
        const usuarioInserted = await prisma.usuario.create({
            data: {
                usuario: usuario,
                nombre: nombre,
                primerapellido: primerapellido,
                segundoapellido: segundoapellido,
                password: passwordHashed,
                admin: admin,
                email: email,
                telefono: telefono
            }
        });
        res.json(usuarioInserted);
        
    } catch (e) {
        console.error(e);
        res.status(401).send(e.message);
        next(e);
    }
}

exports.eliminaUsuario = async (req, res, next) =>{
    try {
        const id =  parseInt(req.params.id);
        const usuario = await prisma.usuario.delete({
            where:{
                idusuario: id
            }
        });
        res.status(200).send(usuario);
    } catch (e) {
        console.error(e);
        res.status(401).send("Ocurrio un error");
        next(e);
    }
}

exports.iniciaSesion = async (req, res, next) => {
    try {
        const { usuario, password } = req.body;
        const userFound = await prisma.usuario.findUnique({
            where:{
                usuario: usuario
            }
        });
        const passConfirm = userFound
        ? await bcrypt.compare(password, userFound.password)
        : false;
        const token = jwt.sign({
            nombre: userFound.nombre,
            primerapellido: userFound.primerapellido,
            segundoapellido: userFound.segundoapellido,
            usuario: usuario,
            email: userFound.email,
            telefono: userFound.telefono
        },
        config.TOKEN_TEXT,
        {
            expiresIn:"60 days"
        });
        passConfirm ? res.json({
            usuario: usuario,
            nombre: userFound.nombre,
            primerapellido: userFound.primerapellido,
            segundoapellido: userFound.segundoapellido,
            admin: !!userFound.admin,
            token: token
        })
        : res.status(401).send("Usuario o contraseña invalidos");
    } catch (e) {
        console.error(e);
        res.status(401).send("Usuario o contraseña invalidos");
        next(e);
    }
}