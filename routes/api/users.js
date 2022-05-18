const express = require("express");
const { validation, contlWrapper, auth, upload } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { joiSchema, joiSignUpSchema } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(joiSignUpSchema), contlWrapper(ctrl.signup));
router.post("/login", validation(joiSignUpSchema), contlWrapper(ctrl.login));
router.get("/logout", auth, contlWrapper(ctrl.logout));
router.get("/current", auth, contlWrapper(ctrl.current));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  contlWrapper(ctrl.updataAvatar)
);
router.get("/verify/:verificationToken",contlWrapper(ctrl.verifyEmail));

module.exports = router;
