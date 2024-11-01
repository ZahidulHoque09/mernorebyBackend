const { apiResponse } = require("../Utlis/ApiResponse");
const { apiError } = require("../Utlis/ApiError");
const { Error } = require("mongoose");
const { mailChecker, passwordChecker } = require("../Helpers/validator");
const { userModel } = require("../Model/user.model");

const Registration = async (req, res) => {
  try {
    const { firstName, email, mobile, address1, password } = req.body;
    if (!firstName || !email || !mobile || !address1 || !password) {
      return res
        .status(405)
        .json(new apiError(false, 405, null, "User credintial is missing"));
    }

    /* ========= If email or Passwor format is valid or not  */

    if (!mailChecker(email) || !passwordChecker(password)) {
      return res
        .status(405)
        .json(
          new apiError(
            false,
            405,
            null,
            "User email or password format is not valided"
          )
        );
    }

    /* =========== Now we will save the data on database========= */
    const saveUserData = await new userModel({
      firstName,
      email,
      mobile,
      address1,
      password,
    }).save();

    res
      .status(200)
      .json(new apiResponse(true, saveUserData, "MERN 2306", false));
  } catch (error) {
    return res.status(501).json(new apiError(false, null, error.message));
  }
};

module.exports = { Registration };
