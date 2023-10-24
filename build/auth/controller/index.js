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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRegisterController = void 0;
const helper_1 = require("../helper");
const userInfo_validator_1 = require("../validators/userInfo.validator");
const responseCode_enum_1 = require("../../store/enums/HTTP_RESPONSE_CODE/responseCode.enum");
class LoginRegisterController {
    static Register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // validate the data 
                const data = yield userInfo_validator_1.userValidatorSchema.validateAsync(req.body);
                // register helper
                const userInfo = yield helper_1.LoginRegisterHelper.RegisterHelper(data);
                const response = {
                    data: Object.assign(Object.assign({}, userInfo), { password: undefined, firebaseToken: undefined }),
                    message: "User Registered Successfully"
                };
                return res
                    .status(201)
                    .json(response);
            }
            catch (error) {
                return res
                    .status(error.statusCode ? error.statusCode : responseCode_enum_1.EHTTPS_RESPONSE_CODE.SERVER_ERROR)
                    .json({ failed: true });
            }
        });
    }
}
exports.LoginRegisterController = LoginRegisterController;
