const USER = require("../models/user");
const signUpController = async (req, res) => {
  const { name, email, password } = req.body;
  const existsUser = await USER.find({
    email,
    password,
  });

  if (existsUser) {
    return res.redirect("/");
  } else {
    const user = await USER.create({
      name,
      email,
      password,
    });
    return res.redirect("/");
  }

  //    return res.send("successfully signup");
};

module.exports = {
  signUpController,
};
