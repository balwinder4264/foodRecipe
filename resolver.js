const QueryResolver = require("./Querieshandler/querieshandler");

const MutationHandler = require("./Querieshandler/mutationhandler");

exports.resolvers = {
  ...QueryResolver,
  ...MutationHandler
};
