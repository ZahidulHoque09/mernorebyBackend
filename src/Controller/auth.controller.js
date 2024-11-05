const { apiResponse } = require("../Utlis/ApiResponse");
const { apiError } = require("../Utlis/ApiError");
const { Error } = require("mongoose");
const { mailChecker, passwordChecker } = require("../Helpers/validator");
const userModel = require("../Model/user.model");
const { makeHashPassword } = require("../Helpers/brycpt.js");
const { numberGenerator } = require("../Helpers/numberGenerator.js");
const { sendMail } = require("../Helpers/nodemailer.js");
const { makeJWTToken } = require("../Helpers/JwtToken.js");

/* ========= Registration auth controller=========== */

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

    /* ======= Now we will encrypt the password============= */

    const hashpassword = await makeHashPassword(password);

    /* ========== OTP Request proceed =================== */

    const otp = numberGenerator();

    /* =========== Now we will save the data on database========= */

    const isSendMail = await sendMail(email, otp);
    if (isSendMail) {
      const saveUserData = await new userModel({
        firstName,
        email,
        mobile,
        address1,
        password: hashpassword,
        otp: otp,
      }).save();

      setTimeout(() => {
        saveUserData.otp = null;
        saveUserData.save();
      }, 10000 * 10); /* ======= to delet otp after some time==== */

      /* =========== Now we will save the OTP on database============= */

      return res
        .status(200)
        .json(
          new apiResponse(
            true,
            saveUserData,
            "Registration is successfull",
            false
          )
        );
    }
    return res
      .status(501)
      .json(
        new apiError(
          false,
          null,
          "Mail does not sent due to internal server error"
        )
      );
  } catch (error) {
    return res.status(501).json(new apiError(false, null, error.message));
  }
};

/* ============ verify OTP auth controller============== */

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res
        .status(405)
        .json(new apiError(false, 405, null, "Otp credintial is missing"));
    }

    const isExistUser = await userModel
      .find({
        $or: [{ email: email }, { otp: otp }],
      })
      .select("-password -email");

    if (!isExistUser) {
      return res
        .status(405)
        .json(new apiError(false, 405, null, "User not found"));
    }
    /* ====== if everything is ok =========== */
    isExistUser.isVerified = true;
    isExistUser.otp = null;

    await isExistUser?.save();

    /* ======= sucessfull massage======== */
    return res
      .status(200)
      .json(
        new apiResponse(
          true,
          isExistUser,
          "OTP verification  is successfull",
          false
        )
      );
  } catch (error) {
    return res.status(501).json(new apiError(false, null, error));
  }
};

/* ============= Make login controller ================= */

const login = async (req, res) => {
  try {
    const { emailorphone, password } = req.body;
    if (!emailorphone || !password) {
      return res
        .status(405)
        .json(new apiError(false, 405, null, "Login  credintial is missing"));
    }
    /* ===== check the information is availablein database or not */

    const loggedUser = await userModel.findOne({
      $or: [{ mobile: emailorphone }, { email: emailorphone }],
    });
    /* ========== Dycrypt the password=============== */
    const isCorrectPassword = await comparePassword(
      password,
      loggedUser?.password
    );

    if (!isCorrectPassword) {
      return res
        .status(401)
        .json(new apiError(false, 401, null, "Login Credential invalid !!"));
    }
    const tokenPayload = {
      id: loggedUser._id,
      email: loggedUser.email,
    };
    const jwt = await makeJWTToken(tokenPayload);
    console.log(jwt);
  } catch (error) {
    return res
      .status(501)
      .json(
        new apiError(false, null, `From login controller Error :  ${error}`)
      );
  }
};

/* ========= Make logout controller ================= */

const logout = async (req, res) => {
  try {
  } catch (error) {
    return res
      .status(501)
      .json(
        new apiError(false, null, `From logout controller Error :  ${error}`)
      );
  }
};

module.exports = { Registration, verifyOtp, login, logout };
