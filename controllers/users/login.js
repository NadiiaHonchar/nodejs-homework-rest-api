const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { User } = require("../../models");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passCompare = bcrypt.compareSync(password, user.password);
  if (!user || !user.verify || !passCompare) {
    const error = new Error("Email if wrong or not veryfi, or password is wrong");
    error.status = 401;
    throw error;
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: "200 OK",
    code: 200,
    ResponseBody: {
      token: token,
      user: {
        email: user,
        subscription: "starter",
      },
    },
  });
};

module.exports = login;
