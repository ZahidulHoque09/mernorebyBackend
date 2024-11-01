const mongoose = require("mongoose");

const chalk = require("chalk");

const { dbName } = require("../Constant/constant");

const dbConnect = async () => {
  try {
    const databaseInstance = await mongoose.connect(
      `${process.env.MONGODB_DATABASE_URL}/${dbName}`
    );

    if (databaseInstance) {
      console.log(
        chalk.blue("Data base connectio successful"),
        databaseInstance.connection.host
      );
    }
  } catch (error) {
    console.log("Data base connection error", error);
  }
};

module.exports = { dbConnect };
