exports.typeDefs = `
type Recipe {
    _id:ID
    name: String!
      category: String!
      description: String!
      instruction:String!
      createdDate: String!
      likes:Int
      username:String!  
}

type User {
  _id:ID
  username: String!
    email: String!
    password: String!
    joinDate:  String
    favorites: [Recipe]
}

type Query {
    getAllRecipe: [Recipe]
    getRecipe(_id:ID!):Recipe
    getCurrentUser:User
    searchRecipe(searchItem:String):[Recipe]
    userReciepe(username:String):[Recipe]
  }
  
  type Mutation {
      addRecipe(name: String!,
         category: String!,
          description: String!,
          instruction:String!,
          username:String!): Recipe
          signupUser(username:String!,email:String!,
            password:String!):Token
            signinUser(username:String!,password:String!):Token

            deleteUserRecipe(_id:ID):Recipe
            likeRecipe(_id:ID,username:String!,like:Boolean):Recipe
  }
 

type Token {
   token :String!
}
`;
