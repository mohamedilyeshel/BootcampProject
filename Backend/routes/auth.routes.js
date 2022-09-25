const { register, login, logout } = require("../controllers/auth.controllers");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
