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
exports.DietPlanController = void 0;
const dietPlanInfo_validator_1 = require("../validator/dietPlanInfo.validator");
const helper_1 = require("../helper");
const responseCode_enum_1 = require("../../../store/enums/HTTP_RESPONSE_CODE/responseCode.enum");
const authConnection_1 = require("../../../DB/authConnection");
class DietPlanController {
    static CreateDietPlan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // validate the data
                const data = yield dietPlanInfo_validator_1.dietPlanValidatorSchema.validateAsync(req.body);
                // helper will craete 
                const dietPlanInfo = yield helper_1.DietPlanHelper.CreationHelper(data);
                const response = {
                    data: Object.assign({}, dietPlanInfo),
                    message: "diet Created Successfully"
                };
                return res
                    .status(responseCode_enum_1.EHTTPS_RESPONSE_CODE.OK)
                    .json(response);
                // send the response
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
    static UpdateDietPlan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dietPlanId = req.params.dietPlanId;
                const updatedDietPlan = req.body;
                const dietPlanDetails = yield helper_1.DietPlanHelper.UpdationHelper(dietPlanId, updatedDietPlan);
                if (!dietPlanDetails) {
                    return res.status(responseCode_enum_1.EHTTPS_RESPONSE_CODE.NOT_FOUND).json({ message: 'diet plan not found' });
                }
                const response = {
                    data: Object.assign({}, dietPlanDetails),
                    message: "diet updated Successfully"
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
    static GetAllDietPlanByInfluencer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const influencerId = req.params.influencerId;
                const allDietPlan = yield helper_1.DietPlanHelper.GetAllDietsHelper(influencerId);
                const response = {
                    data: Object.assign({}, allDietPlan),
                    message: "diets fetched Successfully"
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
    static DeleteDietPlan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dietPlanId = req.params.dietPlanId;
                const { success, planDBModels } = (0, authConnection_1.createPlanDbConnection)();
                if (success) {
                    const deletedPlan = yield planDBModels.Diet.findByIdAndRemove(dietPlanId).lean();
                    if (!deletedPlan) {
                        return res.status(404).json({ message: 'diet plan not found' });
                    }
                    const response = {
                        data: Object.assign({}, deletedPlan),
                        message: "diet plan deleted Successfully"
                    };
                    return res
                        .status(responseCode_enum_1.EHTTPS_RESPONSE_CODE.OK)
                        .json(response);
                }
                else {
                    throw new Error("Unable to connect to Plan db");
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
exports.DietPlanController = DietPlanController;
