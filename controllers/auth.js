const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res
        .status(400)
        .json({ ok: false, msg: "El correo esta registrado" });
    }

    const user = new User(req.body);

    //Encryptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // Generar JWT
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      user,
      token, 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "BD con problemas",
    });
  }
};

const login = async (req, res = response) => {
    const { email, password } = req.body;
  
    try {
      const userBD = await User.findOne({ email });
      if (!userBD) {
        return res
          .status(404)
          .json({ ok: false, msg: "Email no encontrado" });
      }
  
      const validPassword = bcrypt.compareSync(password, userBD.password);
      if (!validPassword) {
        return res
          .status(400)
          .json({ ok: false, msg: "Password no valido" });
      }
  
      // Generar JWT
      const token = await generateJWT(userBD.id);
  
      res.json({
        ok: true,
        user: userBD,
        token, 
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "BD con problemas",
      });
    }
  };


  const renewToken = async (req, res = response) => {
    
    const { uid } = req.body;

    const token = await generateJWT(uid);
  
  try {
      const user = await User.findById({ uid });
      if (!user) {
        return res
          .status(404)
          .json({ ok: false, msg: "Ususario no encontrado" });
      }      
  
      res.json({
        ok: true,
        user: user,
        token, 
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "BD con problemas",
      });
    }
  };


module.exports = { createUser, login, renewToken };
