const { io } = require("../index");

//mensaje de socket
io.on("connection", (client) => {
  console.log("Cliente conectado");

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  
  client.on("mensaje", (payload) => {
    console.log(payload);
    // puedo Emitir a todos los clientes conectados con io o solo al cliente usando client
    io.emit("mensaje", {admin: "Nuevo mensaje"});
  });
});
