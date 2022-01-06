const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const config = require("../config.json")

const prisma = new PrismaClient();

module.exports = {
  createToken: async (usuario, password) => {
    try {
      const userFound = await prisma.usuario.findUnique({
        where: {
          usuario: usuario,
        },
      });
      const passConfirm = userFound
        ? await bcrypt.compare(password, userFound.password)
        : false;
      const token = passConfirm ? jwt.sign(
        {
          nombre: userFound.nombre,
          primerapellido: userFound.primerapellido,
          segundoapellido: userFound.segundoapellido,
          usuario: usuario,
          admin: !!userFound.admin,
          email: userFound.email,
          telefono: userFound.telefono,
        },
        config.TOKEN_TEXT,
        {
          expiresIn: "60 days",
        }
      ): false;
      return token;
    } catch (e) {
      return {
        error: e.message,
      }
    }
    
  },
  verifyToken: (token) =>{
    const isverify = jwt.verify(token, config.TOKEN_TEXT);
    return isverify ? isverify : false
  }
};
