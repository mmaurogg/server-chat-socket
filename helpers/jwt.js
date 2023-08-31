const jwt = require('jsonwebtoken');

const generateJWT = ( uid ) => {
    return new Promise ( (resolve, rejject) =>{
        const payload = { uid };
    jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: '24h'
    }, (err, token) => {
        if(err){
            rejject("No se pudo generar el token")
        } else {
            resolve(token);
        }
    });
    })
}

const comprobarJWT = (token = '') => {
    try { 
        const { uid } =  jwt.verify(token, process.env.JWT_KEY);    
        return [true, uid];
        
      } catch (error) {
        return [false, null]
      }
}

module.exports = {
    generateJWT,
    comprobarJWT
};