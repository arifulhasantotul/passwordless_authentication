import { gql, makeExecutableSchema } from "apollo-server-express";
import exp from "constants";

export const frameworkSchema = makeExecutableSchema({
  typeDefs: gql`
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
