const express = require("express");
const router = express.Router();
const userController = require("../Controllers/user");

router.get("/get-details", userController.getallUsers);
router.post("/submit-details", userController.saveNewUser);

module.exports = router;
