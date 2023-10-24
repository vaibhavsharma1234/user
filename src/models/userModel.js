"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    role: { type: String, required: true },
    avatar: String
});
const UserModel = (0, mongoose_1.model)('User', userSchema);
exports.default = UserModel;
