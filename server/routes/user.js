const router = require("express").Router();
const {changePassword,getUserInfo,updateUser} = require("../controllers/user.js")
// router.post("/changePassword", changePassword);
router.get("/userinfo",getUserInfo);

// router.get('/userTask', getUserTasks);
router.put("/updateuser",updateUser);
module.exports = router