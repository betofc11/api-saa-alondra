const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const {
  createToken,
  verifyToken
} = require("../helpers/jwt_helper");

const prisma = new PrismaClient();

exports.obtieneUsuarios = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isverify = verifyToken(token);
    if (isverify) {
      const usuarios = await prisma.usuario.findMany();
      res.json(usuarios);
    } else {
      res.status(401).send({ error: "Ocurrio un erro de autenticacion" });
    }
  } catch (e) {
    console.log(e.message);
    res.status(401).json({ error: "ERROR: " + e.message });
    next();
  }
};

exports.obtieneUsuarioById = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isverify = verifyToken(token);
    if (isverify) {
      const id = parseInt(req.params.id);
      const usuarios = await prisma.usuario.findUnique({
        where: {
          idusuario: id,
        },
      });
      res.json(usuarios);
    } else {
      res.status(401).send({ error: "Ocurrio un erro de autenticacion" });
    }
  } catch (e) {
    console.log(e.message);
    res.status(401).json({ error: "ERROR: " + e.message });
    next();
  }
};

exports.creaUsuario = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isverify = verifyToken(token);
    if (isverify) {
      const {
        usuario,
        nombre,
        primerapellido,
        segundoapellido,
        admin,
        telefono,
        password,
        confirmedPassword,
        email,
      } = req.body;
      const passwordHashed = password === confirmedPassword
        ? await bcrypt.hash(password, 10)
        : {
          error: "Password or username incorrect",
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
          telefono: telefono,
        },
      });
      res.json(usuarioInserted);
    } else {
      res.status(401).send({ error: "Ocurrio un error de autenticacion" });
    }
  } catch (e) {
    console.error(e);
    res.status(401).send(e.message);
    next(e);
  }
};

exports.eliminaUsuario = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isverify = verifyToken(token);
    if (isverify) {
      const id = parseInt(req.params.id);
      const usuario = await prisma.usuario.delete({
        where: {
          idusuario: id,
        },
      });
      res.status(200).send(usuario);
    } else {
      res.status(401).send({ error: "Ocurrio un error de autenticacion" });
    }
  } catch (e) {
    console.error(e);
    res.status(401).send("Ocurrio un error");
    next(e);
  }
};

exports.iniciaSesion = async (req, res, next) => {
  try {
    const { usuario, password } = req.body;
    const token = await createToken(usuario, password);
    const userFound = await prisma.usuario.findUnique({
      where: {
        usuario: usuario,
      },
    });
    userFound && token
      ? res.json({
        usuario: usuario,
        nombre: userFound.nombre,
        primerapellido: userFound.primerapellido,
        segundoapellido: userFound.segundoapellido,
        admin: !!userFound.admin,
        token: token,
      })
      : res.status(401).send("Usuario o contraseña invalidos");
  } catch (e) {
    console.error(e);
    res.status(401).send("Usuario o contraseña invalidos");
    next(e);
  }
};

exports.veryfyLogin = async (req, res, next) => {
  try {
    const { token } = req.body;
    const isverify = await verifyToken(token);
    isverify ? res.status(200).send({ status: true }) : res.status(403).send({ status: false });
  } catch (e) {
    console.error(e);
    res.status(403).send('Ocurrio un error');
    next(e);
  }
}
