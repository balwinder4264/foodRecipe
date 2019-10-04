const User = require("../../models/user");
const bcrypt = require("bcrypt");
const { createToken } = require("../../TokenCreate/createToken");
module.exports = {
  signinUser: async (root, { username, email, password }) => {
    console.log("yo we ", username);
    const user = await User.findOne({ username });
    console.log(user);
    if (!user) {
      throw new Error("user Does not Exsist");
    }
    const IsValidPassword = await bcrypt.compare(password, user.password);
    if (!IsValidPassword) {
      throw new Error("Invalid password");
    }
    return { token: createToken(user, process.env.SECRET, "1HR") };
  },
  signupUser: async (root, { username, email, password }) => {
    const user = await User.findOne({ username });
    if (user) {
      throw new Error("User Already Exsist");
    }
    const newUser = await new User({
      username,
      email,
      password
    }).save();
    console.log(process.env.SECRET);
    return { token: createToken(newUser, process.env.SECRET, "1HR") };
  }
};
