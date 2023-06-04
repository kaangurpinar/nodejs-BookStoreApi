const express = require('express');
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");
const jwtAuth = require("../middlewares/jwtAuth");
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/profile", auth, userController.getProfile);
router.get("/jwtaccess", jwtAuth, userController.jwtAccessPage);
router.post("/jwtrefresh", auth, userController.jwtRefresh);

module.exports = router;