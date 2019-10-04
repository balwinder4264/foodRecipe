const User = require("../models/user");
const bcrypt = require("bcrypt");
const Recipe = require("../models/recipe");
const UserMutation = require("./user/usermutation");
const RecipeMutation = require("./recipe/recipemutationHandler");

module.exports = {
  Mutation: {
    ...UserMutation,
    ...RecipeMutation
  }
};
