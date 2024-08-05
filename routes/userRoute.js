const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/signup").post(authController.createUser); // http://localhost:3000/users/signup linkine gider "/" ise bu linke git demek aslında
router.route("/login").post(authController.loginUser);
router.route("/logout").get(authController.logoutUser);
router.route("/dashboard").get(authMiddleware, authController.getDashboardPage); //http://localhost:3000/users/dashboard //! authMiddleware ok ise ondan sonra getDashboardPage çalıştır

module.exports = router;