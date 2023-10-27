"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth_routes = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = require("../controller/index");
exports.auth_routes = express_1.default.Router();
exports.auth_routes.post("/register", index_1.LoginRegisterController.Register);
exports.auth_routes.get('/register', (req, res) => {
    res.send("vaibhav");
});
exports.auth_routes.post("/login", index_1.LoginRegisterController.Login);
