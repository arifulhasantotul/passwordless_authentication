"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const graphql_passport_1 = require("graphql-passport");
const passport_1 = __importDefault(require("passport"));
const User_1 = __importDefault(require("../models/User"));
const general_1 = require("../utils/general");
const initPassport = () => {
    passport_1.default.use(new graphql_passport_1.GraphQLLocalStrategy((username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        let matchingUser = null;
        if ((0, general_1.validateEmail)(username)) {
            const email = username;
            matchingUser = yield User_1.default.findOne({ email: email });
            if (!matchingUser) {
                const newUser = new User_1.default({
                    username: email,
                    email: email,
                    loginStrategy: general_1.loginStrategies.LOCAL,
                });
                matchingUser = yield newUser.save();
            }
        }
        else {
            const phone = username;
            matchingUser = yield User_1.default.findOne({ phone: phone });
            if (!matchingUser) {
                const newUser = new User_1.default({
                    username: phone,
                    phone: phone,
                    loginStrategy: general_1.loginStrategies.LOCAL,
                });
                matchingUser = yield newUser.save();
            }
        }
        const error = matchingUser
            ? null
            : new apollo_server_express_1.AuthenticationError("❌ No user matched!");
        done(error, matchingUser);
    })));
    passport_1.default.serializeUser((user, done) => {
        console.log("serializing user ➡️  ", user);
        done(null, user._id);
    });
    passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("deserializing user ➡️  ", id);
        const matchingUser = yield User_1.default.findById(id);
        done(null, matchingUser);
    }));
};
exports.default = initPassport;
