const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const error = new Error("Email in use");
    error.status = 409;
    throw error;
  }
  const verificationToken = nanoid();
  const avatarURL = gravatar.url(email, verificationToken);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
  });

  const mail = {
    to: email,
    subject: "Email confirmation",
    html: `<a target="blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm email</a>`,
  };
  await sendEmail(mail);

  res.status(201).json({
    status: "201 Created",
    ResponseBody: {
      user: {
        email: email,
        verificationToken,
        subscription: "starter",
        avatarURL,
      },
    },
  });
};

module.exports = signup;
