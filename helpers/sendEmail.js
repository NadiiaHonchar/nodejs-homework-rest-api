const nodemailer = require("nodemailer");

const { META_PASSWORD } = process.env;

const sendEmail = async (data) => {
  const email = { ...data, from: "nadiia2022@meta.ua" };

  const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465,
    sequre: "true",
    auth: {
      user: "nadiia2022@meta.ua",
      pass: META_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(nodemailerConfig);

  try {
    await transporter.sendMail(email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
