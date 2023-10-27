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
exports.InfluencerProfileController = void 0;
const helper_1 = require("../helper");
const responseCode_enum_1 = require("../../store/enums/HTTP_RESPONSE_CODE/responseCode.enum");
const authConnection_1 = require("../../DB/authConnection");
class InfluencerProfileController {
    static CreateInfluencerProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // get the user details from the middleare 
            try {
                const { user } = req;
                const influencerObj = {
                    user: user._id,
                    bio: req.body.bio
                };
                // helper for creation of profile which passes 
                const influencerInfo = yield helper_1.InfluencerHelper.CreationHelper(influencerObj);
                const response = {
                    data: Object.assign({}, influencerInfo),
                    message: "influencer Created Successfully"
                };
                return res
                    .status(responseCode_enum_1.EHTTPS_RESPONSE_CODE.OK)
                    .json(response);
            }
            catch (error) {
                let response = {
                    data: [],
                    message: error.message,
                    meta: {
                        error: true
                    }
                };
                return res
                    .status(error.statusCode ? error.statusCode : responseCode_enum_1.EHTTPS_RESPONSE_CODE.SERVER_ERROR)
                    .json(response);
            }
            // send the respons e
        });
    }
    static UpdateInfluencerProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // update the bio here and influencer releated details 
            // do this later
        });
    }
    static GetInfluencerProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.params);
                const influencerId = typeof req.query.id === "string" ? req.query.id : "";
                console.log("influencer id from paraam", influencerId);
                const influencerDetail = yield helper_1.InfluencerHelper.GetInfluencerProfile(influencerId);
                const { _doc } = influencerDetail;
                const response = {
                    data: Object.assign({}, _doc),
                    message: "influencer detail fetched Successfully"
                };
                return res
                    .status(responseCode_enum_1.EHTTPS_RESPONSE_CODE.OK)
                    .json(response);
            }
            catch (error) {
                let response = {
                    data: [],
                    message: error.message,
                    meta: {
                        error: true
                    }
                };
                return res
                    .status(error.statusCode ? error.statusCode : responseCode_enum_1.EHTTPS_RESPONSE_CODE.SERVER_ERROR)
                    .json(response);
            }
        });
    }
    static DeleteInfluencerProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const influencerId = req.params.id;
                console.log("id is", influencerId);
                const { success, authDBModels } = (0, authConnection_1.createAuthDbConnection)();
                console.log("success", success);
                if (success) {
                    const deletedInfluencerDetails = yield authDBModels.Influencer.findByIdAndRemove(influencerId);
                    const { _doc } = deletedInfluencerDetails;
                    const response = {
                        data: Object.assign({}, _doc),
                        message: "influencer detail deleted Successfully"
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
                let response = {
                    data: [],
                    message: error.message,
                    meta: {
                        error: true
                    }
                };
                return res
                    .status(error.statusCode ? error.statusCode : responseCode_enum_1.EHTTPS_RESPONSE_CODE.SERVER_ERROR)
                    .json(response);
            }
        });
    }
}
exports.InfluencerProfileController = InfluencerProfileController;
