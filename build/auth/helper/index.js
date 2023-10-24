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
exports.LoginRegisterHelper = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const authConnection_1 = require("../../DB/authConnection");
class LoginRegisterHelper {
    static RegisterHelper(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
                const { success, authDBModels } = (0, authConnection_1.createAuthDbConnection)();
                if (success) {
                    const userInfo = {
                        name: data.name,
                        username: data.username,
                        emailId: data.emailId,
                        phoneNumber: data.phoneNumber,
                        password: hashedPassword,
                        role: data.role
                    };
                    const user = new authDBModels.User(userInfo);
                    yield user.save();
                    return userInfo;
                }
                else {
                    throw new Error("Unable to connect to Auth db");
                }
            }
            catch (error) {
                throw (error);
            }
        });
    }
}
exports.LoginRegisterHelper = LoginRegisterHelper;
