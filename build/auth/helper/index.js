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
const responseCode_enum_1 = require("../../store/enums/HTTP_RESPONSE_CODE/responseCode.enum");
const customError_1 = require("../../store/error/customError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginRegisterHelper {
    static RegisterHelper(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
                const { success, authDBModels } = (0, authConnection_1.createAuthDbConnection)();
                console.log("success", success);
                if (success) {
                    console.log("stored", data);
                    const userInfo = {
                        name: data.name,
                        username: data.username,
                        emailId: data.emailId,
                        phoneNumber: data.phoneNumber,
                        password: hashedPassword,
                        role: data.role
                    };
                    const user = new authDBModels.User(userInfo);
                    console.log("after save", user);
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
    static LoginHelper({ emailId, phoneNumber, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { success, authDBModels } = (0, authConnection_1.createAuthDbConnection)();
                if (!success) {
                    throw new Error("Unable to connect to Auth db");
                }
                const searchFilter = emailId ? { emailId } : phoneNumber ? { phoneNumber } : null;
                const user = yield authDBModels.User.findOne(searchFilter).lean();
                if (!user) {
                    throw new customError_1.CustomError('Authentication failed', responseCode_enum_1.EHTTPS_RESPONSE_CODE.UNAUTHORIZED_ACCESS);
                }
                // const access = await authDBModels.Access.findOne({token: user.roleToken}).lean();
                const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
                if (!passwordMatch) {
                    throw new customError_1.CustomError('Authentication failed', responseCode_enum_1.EHTTPS_RESPONSE_CODE.UNAUTHORIZED_ACCESS);
                }
                const userInfo = {
                    _id: user._id.toString(),
                    name: user.name,
                    emailId: user.emailId,
                    phoneNumber: user.phoneNumber,
                    role: user.role
                };
                const bearerToken = jsonwebtoken_1.default.sign(userInfo, process.env.SECRET_KEY, {
                    expiresIn: '10d', // Token expires in 10 days, adjust as needed
                });
                return {
                    user,
                    bearerToken,
                };
            }
            catch (error) {
                throw (error);
            }
        });
    }
}
exports.LoginRegisterHelper = LoginRegisterHelper;
