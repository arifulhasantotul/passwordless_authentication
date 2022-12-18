"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPSchema = void 0;
const mongoose_1 = require("mongoose");
exports.OTPSchema = new mongoose_1.Schema({
    otp: { type: String, required: true },
    user: { type: String, required: true, unique: true },
    medium: { type: String, required: true },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: "5m" },
    },
}, {
    timestamps: true,
});
// In case of serverless function to avoid overriding existing schemas
exports.default = mongoose_1.models.OTP || (0, mongoose_1.model)("OTP", exports.OTPSchema);
