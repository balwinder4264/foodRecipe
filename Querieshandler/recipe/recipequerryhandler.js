const Recipe = require("../../models/recipe");
module.exports = {
  getAllRecipe: async (root, args) => {
    const allRecipes = await Recipe.find().sort({
      createdDate: "desc"
    });
    return allRecipes;
  },
  userReciepe: async (root, { username }) => {
    const userRecipe = await Recipe.find({ username }).sort({
      createdDate: "desc"
    });
    console.log("userRecipe  ", userRecipe);
    return userRecipe;
  },
  getRecipe: async (root, { _id }) => {
    const recipe = await Recipe.findOne({ _id });
    return recipe;
  },
  searchRecipe: async (root, { searchItem }) => {
    if (searchItem) {
      const searchItems = await Recipe.find(
        {
          $text: { $search: searchItem }
        },
        {
          score: { $meta: "textScore" }
        }
      ).sort({
        score: { $meta: "textScore" }
      });
      console.log("searchItem 12 ", searchItems);
      return searchItems;
    } else {
      const recipes = await Recipe.find().sort({
        likes: "desc",
        createdDate: "desc"
      });

      return recipes;
    }
  }
};
