const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });
const app = express("express");
//const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
//app.use(bodyParser.json());

const { typeDefs } = require("./schema");
const { resolvers } = require("./resolver");
const { ApolloServer } = require("apollo-server");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    //  console.log(req.headers["authorization"]);
    const token = req.headers["authorization"];

    if (token !== "null") {
      try {
        const currentuser = await jwt.verify(token, process.env.SECRET);

        return currentuser;
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("not token ");
    }
  }
});

const PORT = process.env.PORT || 4444;
mongoose
  .connect(
    "mongodb+srv://balwinder:balwinder@foodcluster-iyupi.mongodb.net/arrow?retryWrites=true&w=majority",

    { useNewUrlParser: true }
  )
  .then(() => {
    server.listen(8000);
  })
  .catch(err => {
    console.log(err);
  });

if (process.env.NODE_ENV === "production") {
}

// mongoose.connect(
//   "mongodb+srv://balwinder:arshjeet@cluster0-k1gir.mongodb.net/admin?retryWrites=true&w=majority",
//   { useNewUrlParser: true },
//   function(err) {
//     if (err) {
//       console.log(err);
//     } else {
//       server.listen(8000);
//       console.log("Connected to mongodb");
//     }
//   }
// );

server.listen(PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
