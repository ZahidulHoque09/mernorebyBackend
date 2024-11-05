const bcrypt = require("bcrypt");
const makeHashPassword = async (plainPassword) => {
  try {
    return await bcrypt.hash(plainPassword, 10);
  } catch (error) {
    console.log("Falied to make hash password");
  }
};

module.exports = { makeHashPassword };
