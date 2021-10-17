const express = require("express");
const { Auth } = require("../app/controllers");

const router = express.Router();
router.post("/regis", Auth.regis);
router.post("/verify", Auth.validation);
router.post("/login", Auth.login);
// router.post("/logout", Auth.logout);

module.exports = router;