//path: api/login

const { Router, response } = require("express");
const { check } = require("express-validator");

const { getUsers } = require("../controllers/users");
const validateJWT = require("../middlewares/validate-jwt");



const router = Router();

// el segundo argumento son los midlewares
router.get('/', validateJWT, getUsers );

module.exports = router;
