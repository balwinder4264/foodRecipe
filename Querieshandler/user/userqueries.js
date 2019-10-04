const User = require("../../models/user");
module.exports = {
  getCurrentUser: async (root, { username, email, password }, context) => {
    console.log("context", context.username);
    console.log("user ", username);
    if (!context.username) {
      return null;
    }
    const user = await User.findOne({ username: context.username }).populate({
      path: "favorites",
      model: "Recipe"
    });

    return user;
  }
};
