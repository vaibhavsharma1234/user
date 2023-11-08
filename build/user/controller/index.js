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
exports.UserProfileController = void 0;
const authConnection_1 = require("../../DB/authConnection");
const responseCode_enum_1 = require("../../store/enums/HTTP_RESPONSE_CODE/responseCode.enum");
const helper_1 = require("../helper");
const userInfo_validator_1 = require("../../auth/validators/userInfo.validator");
class UserProfileController {
    static GetUserDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // The authenticated user's ID is available in req.user
                const { success, authDBModels } = (0, authConnection_1.createAuthDbConnection)();
                if (success) {
                    console.log(req.user);
                    const user = yield authDBModels.User.findOne({ _id: req.user._id });
                    console.log("user", user);
                    if (!user) {
                        return res.status(404).json({ message: 'User not found' });
                    }
                    // Return the user's profile data, excluding sensitive information like the password
                    const response = {
                        data: {
                            user: user,
                        },
                        message: "User Detailed fetched Successfully"
                    };
                    return res
                        .status(responseCode_enum_1.EHTTPS_RESPONSE_CODE.OK)
                        .json(response);
                }
                else {
                    throw new Error("Unable to connect to Auth db");
                }
            }
            catch (error) {
                console.error(error);
                return res.status(responseCode_enum_1.EHTTPS_RESPONSE_CODE.SERVER_ERROR).json({ message: 'Server error' });
            }
        });
    }
    static UpdateUserDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, emailId, name, phoneNumber } = req.body;
            const { success, authDBModels } = (0, authConnection_1.createAuthDbConnection)();
            if (success) {
                // Validate the request body
                const { error, value } = userInfo_validator_1.userValidatorSchema.validate(req.body);
                if (error) {
                    return res.status(400).json({ message: 'Validation error', error: error.details });
                }
                try {
                    const user = yield authDBModels.User.findOne({ _id: req.user._id });
                    if (!user) {
                        return res.status(404).json({ message: 'User not found' });
                    }
                    if (value.username) {
                        user.username = value.username;
                    }
                    if (value.emailId) {
                        user.emailId = value.emailId;
                    }
                    if (value.name) {
                        user.name = value.name;
                    }
                    if (value.phoneNumber) {
                        user.phoneNumber = value.phoneNumber;
                    }
                    // Save the updated user data
                    yield user.save();
                    // Generate a new token (if necessary)
                    const token = (0, helper_1.generateNewToken)(user);
                    // Return the user's profile data, excluding sensitive information like the password
                    const response = {
                        data: {
                            user,
                            token: token, // Convert the Mongoose document to a plain JavaScript object
                        },
                        message: 'User Details updated Successfully',
                    };
                    return res.status(responseCode_enum_1.EHTTPS_RESPONSE_CODE.OK).json(response);
                }
                catch (error) {
                    console.error(error);
                    return res.status(responseCode_enum_1.EHTTPS_RESPONSE_CODE.SERVER_ERROR).json({ message: 'Internal server error' });
                }
            }
            else {
                throw new Error('Unable to connect to Auth db');
            }
        });
    }
}
exports.UserProfileController = UserProfileController;
