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
exports.userResolvers = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const OTP_1 = __importDefault(require("../../models/OTP"));
const general_1 = require("../../utils/general");
exports.userResolvers = {
    Query: {
        currentUser: (parent, args, context) => {
            return context.getUser();
        },
    },
    Mutation: {
        getOtp: (_, { emailOrPhone }) => __awaiter(void 0, void 0, void 0, function* () {
            if (!emailOrPhone) {
                throw new apollo_server_express_1.UserInputError("❌ No email or phone found!");
            }
            const isEmail = (0, general_1.validateEmail)(emailOrPhone);
            const genOtp = (0, general_1.otpGeneratorUtil)();
            if (isEmail) {
                try {
                    const otp = yield OTP_1.default.findOne({ user: emailOrPhone });
                    if (otp) {
                        throw new Error("❌ OTP already sent!");
                    }
                    const newOtp = new OTP_1.default({
                        user: emailOrPhone,
                        otp: genOtp,
                        medium: "email",
                    });
                    // save otp to db
                    yield newOtp.save();
                    // send otp to user email by node mailer
                    return `✅ OTP sent to ${emailOrPhone}`;
                }
                catch (err) {
                    console.log("❌ Error sending otp to email: ", err);
                    throw new apollo_server_express_1.UserInputError("❌ Invalid email!");
                }
            }
            else {
                let phoneNumber;
                try {
                    const { value, countryCode } = JSON.parse(emailOrPhone);
                    phoneNumber = value;
                    const otp = yield OTP_1.default.findOne({ user: phoneNumber });
                    if (otp) {
                        throw new Error("❌ OTP already sent!");
                    }
                    const newOtp = new OTP_1.default({
                        user: phoneNumber,
                        otp: genOtp,
                        medium: "phone",
                    });
                    yield newOtp.save();
                    // send otp to user phone by twilio
                    return `✅ OTP sent to ${phoneNumber}`;
                }
                catch (err) {
                    console.log("❌ Error sending otp to phone: ", err);
                    throw new apollo_server_express_1.UserInputError("❌ Invalid phone!");
                }
            }
        }),
        login: (_, { otp }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const foundOtp = yield OTP_1.default.findOne({ otp });
            if (!foundOtp)
                throw new apollo_server_express_1.AuthenticationError("❌ Invalid or expired OTP!");
            const { user, info } = yield context.authenticate("graphql-local", {
                username: foundOtp === null || foundOtp === void 0 ? void 0 : foundOtp.user,
                password: foundOtp === null || foundOtp === void 0 ? void 0 : foundOtp.user,
            });
            context.login(user);
            return { user };
        }),
        logout: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            context.logout();
            context.req.session &&
                context.req.session.destroy((err) => {
                    if (err) {
                        console.log("❌ Error logging out: ", err);
                        throw new apollo_server_express_1.AuthenticationError(err);
                    }
                });
            context.req.session = null;
            return true;
        }),
    },
};
