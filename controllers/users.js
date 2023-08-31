const { response } = require("express");
const User = require("../models/user");

const getUsers = async (req, res = response) => {

    //paginacion 
    //esto consulta un query
    const desde = Number ( req.query.desde ) || 0;

  const users = await User
    .find({ _id: { $ne: req.uid } })
    .sort("-online")
    .skip(desde).limit(20);

  res.status(200).json({ ok: true, users: users });
};
module.exports = {
  getUsers,
};
