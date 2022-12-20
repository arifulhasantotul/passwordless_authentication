"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    email: {
        type: String,
        required: false,
        index: true,
        unique: true,
        sparse: true,
    },
    phone: {
        type: String,
        required: false,
        index: true,
        unique: true,
        sparse: true,
    },
    loginStrategy: { type: String, required: true },
}, {
    timestamps: true,
});
// In case of serverless function to avoid overriding existing schemas
exports.default = mongoose_1.models.User || (0, mongoose_1.model)("User", exports.UserSchema);
