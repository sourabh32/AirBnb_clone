const express = require("express");
const { authUser, registerUser, getProfile } = require("../controllers/userController");

const router = express.Router()



router.route('/auth').post(authUser);
router.route('/register').post(registerUser);
router.route('/profile').get(getProfile);
exports.userRouter = router