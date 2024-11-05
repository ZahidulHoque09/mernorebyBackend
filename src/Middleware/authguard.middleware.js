const authGuard = async (req, res, next) => {
  try {
    const coockie = req.coockies;
    console.log(coockie);
  } catch (error) {
    console.log("Error from AuthGuard Middleware", error);
  }
};

module.exports = { authGuard };
