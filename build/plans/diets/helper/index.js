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
exports.DietPlanHelper = void 0;
const authConnection_1 = require("../../../DB/authConnection");
class DietPlanHelper {
    static CreationHelper(dietInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { success, planDBModels } = (0, authConnection_1.createPlanDbConnection)();
                if (success) {
                    console.log("diet", dietInfo);
                    const dietPlanInfo = {
                        name: dietInfo.name,
                        description: dietInfo.description,
                        dailyCalories: dietInfo.dailyCalories,
                        mealCalories: dietInfo.mealCalories,
                        dietaryRestrictions: dietInfo.dietaryRestrictions,
                        breakfast: dietInfo.breakfast,
                        lunch: dietInfo.lunch,
                        snacks: dietInfo.snacks,
                        dinner: dietInfo.dinner,
                        influencer: dietInfo.influencer,
                    };
                    const dietPlanDetails = new planDBModels.Diet(dietPlanInfo);
                    console.log("after save", dietPlanDetails);
                    yield dietPlanDetails.save();
                    return dietPlanDetails;
                }
                else {
                    throw new Error("Unable to connect to Plan db");
                }
            }
            catch (error) {
                throw (error);
            }
        });
    }
    static UpdationHelper(dietPlanid, updatedDietPlan) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { success, planDBModels } = (0, authConnection_1.createPlanDbConnection)();
                if (success) {
                    const updatePlan = planDBModels.Diet.findByIdAndUpdate(dietPlanid, { $set: updatedDietPlan }, { new: true });
                    return updatePlan;
                }
                else {
                    throw new Error("Unable to connect to Plan db");
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    static GetAllDietsHelper(influencerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { success, planDBModels } = (0, authConnection_1.createPlanDbConnection)();
                if (success) {
                    const dietPlans = yield planDBModels.Diet.find({ influencer: influencerId });
                    return dietPlans;
                }
                else {
                    throw new Error("Unable to connect to Plan db");
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.DietPlanHelper = DietPlanHelper;
