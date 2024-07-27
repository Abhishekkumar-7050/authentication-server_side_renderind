const express = require("express");

const router = express.Router();


const {signUpController} = require("../controller/signup")
const {handleUserLogin}  = require ("../controller/login")


router.post('/signup',signUpController);
router.post('/login',handleUserLogin);
;
module.exports = router;