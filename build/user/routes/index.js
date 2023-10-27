"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_profile_routes = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
exports.user_profile_routes = express_1.default.Router();
exports.user_profile_routes.get("/profile", controller_1.UserProfileController.GetUserDetails);
exports.user_profile_routes.put("/profile", controller_1.UserProfileController.UpdateUserDetails);
