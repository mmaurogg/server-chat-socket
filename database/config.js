const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);
    console.log('DB online');
  } catch (error) {
    console.log(err);
    throw new Error("Error al conectar con la base de datos");
  }
};

module.exports = {
  dbConnection,
};
