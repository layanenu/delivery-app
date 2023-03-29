const { Router } = require("express");
const controller = require("../controllers/registerController");
const {
  validateName,
  validatePassword,
  validateEmail,
} = require("../middlewares/userValidate");

const router = Router();

router.post(
  "/",
  validateName,
  validatePassword,
  validateEmail,
  controller.register
);

module.exports = router;
