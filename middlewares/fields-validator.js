const { validationResult } = require("express-validator");

const fieldValidator = (req, res, next ) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  // se agrega el next para poder validar todos los validators
  next();
};

module.exports = { fieldValidator };
