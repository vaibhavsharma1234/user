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
class UserProfileController {
    static GetUserDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // The authenticated user's ID is available in req.user
                const { success, authDBModels } = (0, authConnection_1.createAuthDbConnection)();
                if (success) {
                    console.log(req.user);
                    const user = yield authDBModels.User.findOne({ emailId: req.user.emailId });
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
            const { username, emailId } = req.body;
            const { success, authDBModels } = (0, authConnection_1.createAuthDbConnection)();
            if (success) {
                console.log(req.user);
                try {
                    const user = yield authDBModels.User.findOne({ emailId: req.user.emailId });
                    if (!user) {
                        return res.status(404).json({ message: 'User not found' });
                    }
                    if (username) {
                        user.username = username;
                    }
                    if (emailId) {
                        user.emailId = emailId;
                    }
                    // Save the updated user data
                    yield user.save();
                    console.log("iss", user);
                    const token = (0, helper_1.generateNewToken)(user);
                    //             const updatedUser = {
                    //                 data:{
                    //                 ...user.toObject()
                    //             } 
                    //         }
                    // console.log("updated user",updatedUser.data._doc)
                    // Return the user's profile data, excluding sensitive information like the password
                    const response = {
                        data: {
                            user: user,
                            token: token // Convert the Mongoose document to a plain JavaScript object
                        },
                        message: "User Details updated Successfully",
                    };
                    return res
                        .status(responseCode_enum_1.EHTTPS_RESPONSE_CODE.OK)
                        .json(response);
                }
                catch (error) {
                    console.error(error);
                    return res.status(responseCode_enum_1.EHTTPS_RESPONSE_CODE.SERVER_ERROR).json({ message: 'Internal server error' });
                }
            }
            else {
                throw new Error("Unable to connect to Auth db");
            }
        });
    }
}
exports.UserProfileController = UserProfileController;
