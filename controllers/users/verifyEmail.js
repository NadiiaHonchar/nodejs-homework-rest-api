const { User } = require("../../models");

const verifyEmail = async (req, resp) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw NotFound();
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({
    message: "Verify success",
  });
};

module.exports = verifyEmail;
