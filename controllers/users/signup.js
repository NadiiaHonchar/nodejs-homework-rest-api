const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");

const { User } = require("../../models");

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    // throw new Conflict("Email in use")
    const error = new Error("Email in use");
    error.status = 409;
    throw error;
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({ email, password: hashPassword });  
  res.status(201).json({
    status: "201 Created",
    ResponseBody: {
      user: {
        // email: "example@example.com",
        email: email,
        subscription: "starter",
      },
    },
  });
};

module.exports = signup;
