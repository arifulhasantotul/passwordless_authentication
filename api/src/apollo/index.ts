import { mergeSchemas } from "apollo-server-express";
import { userSchema, frameworkSchema } from "./type-defs";
import { userResolvers, frameworkResolvers } from "./resolvers";

export const schemaObject = mergeSchemas({
  schemas: [frameworkSchema, userSchema],
  resolvers: [frameworkResolvers, userResolvers],
});
