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
exports.InfluencerHelper = void 0;
const authConnection_1 = require("../../DB/authConnection");
class InfluencerHelper {
    static CreationHelper(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // get the data from the db of user
            try {
                const { success, authDBModels } = (0, authConnection_1.createAuthDbConnection)();
                console.log("success", success);
                if (success) {
                    const influencer = new authDBModels.Influencer(data);
                    console.log("after save influencer", influencer);
                    yield authDBModels.User.findByIdAndUpdate(influencer.user, { role: "influencer" });
                    yield influencer.save();
                    const influencerx = yield authDBModels.Influencer.findById(influencer._id).populate('user');
                    return influencerx;
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
    static GetInfluencerProfile(influencerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { success, authDBModels } = (0, authConnection_1.createAuthDbConnection)();
                console.log("success", success);
                if (success) {
                    const influencerDetails = yield authDBModels.Influencer.findById(influencerId).populate('user');
                    console.log("influerncer details from get influencer", influencerDetails);
                    return influencerDetails;
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
exports.InfluencerHelper = InfluencerHelper;
