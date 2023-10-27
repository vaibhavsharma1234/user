"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNewToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.SECRET_KEY;
function generateNewToken(user) {
    console.log("user from genrerate ", user);
    console.log("user id", user._id.toString());
    const userInfo = {
        _id: user._id.toString(),
        name: user.name,
        emailId: user.emailId,
        phoneNumber: user.phoneNumber,
        role: user.role
    };
    // Sign the new token with the updated user data
    const token = jsonwebtoken_1.default.sign(userInfo, secret, { expiresIn: '1d' }); // Adjust the expiration time as needed
    return token;
}
exports.generateNewToken = generateNewToken;
