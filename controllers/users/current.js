const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");

const { User } = require("../../models");

const current = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    status: "ok",
    code: 200,
    ResponseBody: {
      email: email,
      subscription: subscription,
    },
  });
};

module.exports = current;
