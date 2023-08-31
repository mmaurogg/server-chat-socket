/*
    Path: /api/message
*/
const { Router } = require('express');
const validateJWT = require('../middlewares/validate-jwt');

const { getChat } = require('../controllers/messages');


const router = Router();


router.get('/:de', validateJWT, getChat );

module.exports = router;


