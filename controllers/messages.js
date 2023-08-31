
const { response } = require('express');
const Message = require('../models/message');

const getChat = async (req, res = response) => {

    const miId = req.uid;
    const mensajesDe = req.params.de;

    const last30 = await Message.find({
        $or: [{ de: miId, para: mensajesDe }, { de: mensajesDe, para: miId } ]
    })
    .sort({ createdAt: 'desc' })
    .limit(30); 

    res.status(200).json({
        ok: true,
        messages: last30
    });

};

module.exports = {
    getChat
}