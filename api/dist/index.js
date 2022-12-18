"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const graphql_passport_1 = require("graphql-passport");
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const uuid_1 = require("uuid");
const apollo_1 = require("./apollo");
const initPassport_1 = __importDefault(require("./passport/initPassport"));
dotenv.config();
(0, initPassport_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    genid: (req) => (0, uuid_1.v4)(),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Initializing apollo server
const apolloServer = new apollo_server_express_1.ApolloServer({
    schema: apollo_1.schemaObject,
    context: ({ req, res }) => (0, graphql_passport_1.buildContext)({ req, res }),
    playground: {
        settings: {
            "request.credentials": "include",
        },
    },
});
apolloServer.applyMiddleware({ app, cors: false });
app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>");
});
const port = process.env.PORT || 4000;
mongoose_1.default
    .connect(process.env.MONGOS_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(() => {
    console.log("✅ Connected to MongoDB...");
    app.listen(port, () => {
        console.log(`🚀 Server running on port`, port);
    });
})
    .catch((err) => {
    console.log("❌ Failed to connect to MongoDB...", err);
});
// tutorial 7 done. tutorial 8 running
// important tutorial 8 time 8:00 to 10:09
