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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTPEmail = void 0;
const nodemailer = __importStar(require("nodemailer"));
const sendEmail = (message, sender) => {
    return new Promise((res, rej) => {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: sender.email,
                pass: sender.password,
            },
        });
        transporter.sendMail(message, (err, info) => {
            err ? rej(err) : res(info);
        });
    });
};
const sendOTPEmail = ({ toUser, otp, sender, }) => {
    const message = {
        from: (sender === null || sender === void 0 ? void 0 : sender.email) || process.env.SENDER_EMAIL,
        to: toUser,
        subject: "Login Otp",
        html: `
    <h3>Hello ${toUser} 😊</h3>
    <p>Please use the following OTP to login</p>
      <br/>
      <h2>${otp}</h2>
      <p>Cheers,</p>
      <p>Your Application Team</p>
      `,
    };
    let mailSender = sender;
    if (!sender) {
        mailSender = {
            email: process.env.SENDER_EMAIL,
            password: process.env.SENDER_EMAIL_PASSWORD,
        };
    }
    return sendEmail(message, mailSender);
};
exports.sendOTPEmail = sendOTPEmail;
