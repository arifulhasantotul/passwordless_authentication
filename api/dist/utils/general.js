"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginStrategies = exports.otpGeneratorUtil = exports.validateEmail = void 0;
const otp_generator_1 = __importDefault(require("otp-generator"));
const validateEmail = (input) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(input).toLowerCase());
};
exports.validateEmail = validateEmail;
const otpGeneratorUtil = () => {
    const getOtp = otp_generator_1.default.generate(6, {
        upperCase: false,
        specialChars: false,
        alphabets: false,
    });
    return getOtp;
};
exports.otpGeneratorUtil = otpGeneratorUtil;
var loginStrategies;
(function (loginStrategies) {
    loginStrategies["LOCAL"] = "LOCAL";
    loginStrategies["GITHUB"] = "GITHUB";
})(loginStrategies = exports.loginStrategies || (exports.loginStrategies = {}));
