"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.userSchema = (0, apollo_server_express_1.makeExecutableSchema)({
    typeDefs: (0, apollo_server_express_1.gql) `
    type User {
      _id: ID!
      username: String
      email: String
      phone: String
      loginStrategy: String!
    }

    type AuthPayload {
      user: User
    }

    type Query {
      currentUser: User
    }

    type Mutation {
      getOtp(emailOrPhone: String!): String!
      login(otp: String!): AuthPayload
      logout: Boolean
      updateProfile(
        id: ID!
        username: String
        email: String
        phone: String
      ): String!
    }
  `,
});
