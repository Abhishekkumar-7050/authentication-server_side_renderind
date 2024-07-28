

const { v4: uuidv4 } = require("uuid");
const USER = require("../models/user");
const { setUser } = require("../utils/usertoIdMap");
const { use } = require("../routes/auth");



async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  // console.log(" body me kya aa rha ha", email ," ", password);
  const user = await USER.findOne({ email, password });
  // console.log(" user is", user);
  if (!user){
    // console.log(" user not found");
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  }
  

 else{
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    res.redirect('/');
 }

}

module.exports = {
//   handleUserSignup,
  handleUserLogin,
};


















