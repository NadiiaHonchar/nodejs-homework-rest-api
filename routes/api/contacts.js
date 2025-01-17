const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const { validation, contlWrapper, auth } = require("../../middlewares");
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");

router.get("/", auth, contlWrapper(ctrl.listContacts));
router.get("/:contactId", contlWrapper(ctrl.getContactById));
router.post("/", auth, validation(joiSchema), contlWrapper(ctrl.addContact));
router.delete("/:contactId", contlWrapper(ctrl.removeContact));
router.put(
  "/:contactId",
  validation(joiSchema),
  contlWrapper(ctrl.updateContact)
);
router.patch(
  "/:contactId/favorite",
  validation(favoriteJoiSchema),
  contlWrapper(ctrl.updateFavoriteContact)
);

module.exports = router;
