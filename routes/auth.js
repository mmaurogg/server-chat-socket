//path: api/login

const { Router, response } = require("express");
const { check } = require("express-validator");

const { createUser, login, renewToken } = require("../controllers/auth");
const { fieldValidator } = require("../middlewares/fields-validator");
const validateJWT = require("../middlewares/validate-jwt");



const router = Router();

// el segundo argumento son los midlewares
router.post("/new",
  [
    /* check("nombre", "El nombre es requerido").not().isEmpty(), 
    check("password", "El password es requerido").not().isEmpty(), 
    check("email", "El email es requerido").not().isEmail(),  */
    fieldValidator
  ],
  createUser
);

router.post("/",
  [
    /* check("password", "El password es requerido").not().isEmpty(), 
    check("email", "El email es requerido").not().isEmail(),  */
    fieldValidator
  ],
  login
);

router.get('/renew', validateJWT, renewToken);

  

module.exports = router;
