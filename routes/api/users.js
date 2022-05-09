const express = require("express");
const { validation, contlWrapper, auth } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { joiSchema, joiSignUpSchema } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(joiSignUpSchema), contlWrapper(ctrl.signup));
router.post("/login", validation(joiSignUpSchema), contlWrapper(ctrl.login));
router.get("/logout", auth, contlWrapper(ctrl.logout));
router.get("/current", auth, contlWrapper(ctrl.current));

module.exports = router;
