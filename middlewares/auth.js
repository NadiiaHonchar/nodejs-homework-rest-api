const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
      // const error = new Error("Not authorized");
      // error.status = 401;
      // throw error;
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user || !user.token) {
        throw new Unauthorized("Not authorized");
        // const error = new Error("Not authorized");
        // error.status = 401;
        // throw error;
      }
      req.user = user;
      next();
    } catch (error) {
      if ((error.message = "Invalid sugnature")) {
        error.status = 401;
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
