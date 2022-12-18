"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaObject = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const type_defs_1 = require("./type-defs");
const resolvers_1 = require("./resolvers");
exports.schemaObject = (0, apollo_server_express_1.mergeSchemas)({
    schemas: [type_defs_1.frameworkSchema, type_defs_1.userSchema],
    resolvers: [resolvers_1.frameworkResolvers, resolvers_1.userResolvers],
});
