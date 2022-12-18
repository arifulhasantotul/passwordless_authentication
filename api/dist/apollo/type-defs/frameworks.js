"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.frameworkSchema = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.frameworkSchema = (0, apollo_server_express_1.makeExecutableSchema)({
    typeDefs: (0, apollo_server_express_1.gql) `
    type Framework {
      _id: ID!
      name: String!
      url: String
    }

    type Query {
      listFrameworks: [Framework]!
    }
  `,
});
