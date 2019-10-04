const UserQuerryHandler = require("./user/userqueries");
const RecipeQuerryHandler = require("./recipe/recipequerryhandler");
module.exports = {
  Query: {
    ...UserQuerryHandler,
    ...RecipeQuerryHandler
  }
};
