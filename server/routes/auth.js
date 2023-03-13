const {
    signup,
    login,
    logout
  } = require("../controllers/auth.js");
  const router = require("express").Router();

router.post("/signup",signup);
router.post("/login",login);
// router.get("/logout",logout)

// router.post('/changePassword',changePassword);
module.exports = router






