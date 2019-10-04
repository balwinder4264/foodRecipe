const mongoos = require("mongoose");
const Schema = mongoos.Schema;
const recipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  instruction: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now()
  },
  likes: {
    type: Number,
    default: 0
  },
  username: {
    type: String
  }
});

recipeSchema.index({
  "$**": "text"
});
module.exports = mongoos.model("Recipe", recipeSchema);
