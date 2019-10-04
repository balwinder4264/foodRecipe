const Recipe = require("../../models/recipe");
const User = require("../../models/user");
module.exports = {
  addRecipe: async (
    root,
    { name, description, category, instruction, username },
    context
  ) => {
    const newReciepe = await new Recipe({
      name,
      description,
      category,
      instruction,
      username
    }).save();
    return newReciepe;
  },
  deleteUserRecipe: async (root, { _id }) => {
    const recipe = await Recipe.findByIdAndRemove({ _id });
    return recipe;
  },
  likeRecipe: async (root, { _id, username, like }) => {
    console.log("likes ", username, _id, like);
    let recipe = "";
    if (!like) {
      recipe = await Recipe.findByIdAndUpdate({ _id }, { $inc: { likes: 1 } });
      const user = await User.findOneAndUpdate(
        { username },
        {
          $addToSet: {
            favorites: _id
          }
        }
      );
    } else {
      recipe = await Recipe.findByIdAndUpdate({ _id }, { $inc: { likes: -1 } });
      const user = await User.findOneAndUpdate(
        { username },
        {
          $pull: {
            favorites: _id
          }
        }
      );
    }

    return recipe;
  }
};
