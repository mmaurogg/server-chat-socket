const { io } = require("../index");
const Band = require("../models/band");
const Bands = require("../models/bands");

//Se necesita que se mantengan las bandas
const bands = new Bands();
bands.addBand(new Band("Metal"));

//mensaje de socket
io.on("connection", (client) => {
  console.log("Cliente conectado");

  client.emit("active-bands", bands.getBands());

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

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
  });
});
