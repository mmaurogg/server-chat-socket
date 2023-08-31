const { comprobarJWT } = require("../helpers/jwt");
const { io } = require("../index");
const { userConnect, userDisconnect, saveMessage } = require("../controllers/socket");

const Band = require("../models/band");
const Bands = require("../models/bands");

//Se necesita que se mantengan las bandas
const bands = new Bands();
bands.addBand(new Band("Metal"));

//mensaje de socket de bandas
io.on("connection", (client) => {
  console.log("Cliente conectado");

  //verificar que haya token en el cliente que se conecta
  let token = client.handshake.auth["token"];
  //let token = client.handshake.headers.token

  //console.log(token);
  const [valido, uid] = comprobarJWT(token);

  if (!valido) {
    return client.disconnect();
  }
  //console.log(valido, uid);
  userConnect( uid );

  //ingresar a un chat con alguien
  //une al cliente con la sala del mismo id del user
  client.join(uid);
  client.on('mensaje-personal', async ( payload )=>{
    console.log(payload);
    
    const res = await saveMessage(payload);
    console.log
    (res);

    io.to( payload.para ).emit('mensaje-personal', payload);
  });



  client.on("disconnect", () => {
    console.log("Cliente desconectado");
    userDisconnect(uid);
  });










  /*  client.emit("active-bands", bands.getBands());

  

  client.on("mensaje", (payload) => {
    console.log(payload);
    // puedo Emitir a todos los clientes conectados con io o solo al cliente usando client
    io.emit("mensaje", { admin: "Nuevo mensaje" });
  });

  client.on("event", (payload) => {
    console.log(payload);
    // puedo Emitir a todos los clientes conectados con io o solo al cliente usando client
    //io.emit("event", payload); //todos
    client.broadcast.emit("event", payload); // emitir a todos menos al que lo envio
  });

  client.on("vote-band", (payload) => {
    bands.voteBand( payload.id);
    io.emit("active-bands", bands.getBands()); // emitir a todos menos al que lo envio
  });

  client.on("add-band", (payload) => {
    bands.addBand( new Band(payload.name));
    io.emit("active-bands", bands.getBands()); // emitir a todos menos al que lo envio
  });

  client.on("delete-band", (payload) => {
    bands.deleteBand( payload.id );
    io.emit("active-bands", bands.getBands()); // emitir a todos menos al que lo envio
  }); */
});
