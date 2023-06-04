const express = require('express');
const adminAuth = require("../middlewares/adminAuth");
const adminController = require("../controllers/adminController");
const router = express.Router();

router.get("/users", adminAuth, adminController.getUsers);
router.get("/users/:id", adminAuth, adminController.getUserById);
router.delete("/users/:id", adminAuth, adminController.deleteUserById);
router.put("/users/:id", adminAuth, adminController.updateUser);

module.exports = router;