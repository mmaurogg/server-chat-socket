const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
  const token = req.header("token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token",
    });
  }

  try {

    //Validar el token
    const { uid } =  jwt.verify(token, process.env.JWT_KEY);
    req.uid = uid;

    next();
    
  } catch (error) {
    return res.status(401).json({
        ok: false,
        msg: "Token no valido",
      });
  }

  
};

module.exports = validateJWT;
