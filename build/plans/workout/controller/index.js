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
exports.WorkoutPlanController = void 0;
const workout_validator_1 = require("../validators/workout.validator");
const helper_1 = require("../helper");
const responseCode_enum_1 = require("../../../store/enums/HTTP_RESPONSE_CODE/responseCode.enum");
const authConnection_1 = require("../../../DB/authConnection");
class WorkoutPlanController {
    static CreateWorkoutPlan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // validate the data that came 
                const data = yield workout_validator_1.workoutPlanValidatorSchema.validateAsync(req.body);
                // workout plan creator helper
                const workoutPlanDetails = yield helper_1.WorkoutPlanHelper.CreationHelper(data);
                const response = {
                    data: Object.assign({}, workoutPlanDetails),
                    message: "Workout created Successfully"
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
    static GetAllWorkoutPlanByInfluencer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const influencerId = req.params.influencerId;
                const allWorkoutPlan = yield helper_1.WorkoutPlanHelper.GetAllWorkoutHelper(influencerId);
                const response = {
                    data: Object.assign({}, allWorkoutPlan),
                    message: "Workouts fetched Successfully"
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
    static UpdateWorkoutPlan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const workoutId = req.params.workoutId;
                const updatedWorkoutPlan = req.body;
                const workoutPlanDetails = yield helper_1.WorkoutPlanHelper.UpdationHelper(workoutId, updatedWorkoutPlan);
                if (!workoutPlanDetails) {
                    return res.status(responseCode_enum_1.EHTTPS_RESPONSE_CODE.NOT_FOUND).json({ message: 'Workout plan not found' });
                }
                const response = {
                    data: Object.assign({}, workoutPlanDetails),
                    message: "Workouts updated Successfully"
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
    static DeleteWorkoutPlan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const workoutId = req.params.workoutId;
                const { success, planDBModels } = (0, authConnection_1.createPlanDbConnection)();
                if (success) {
                    const deletedPlan = yield planDBModels.Workout.findByIdAndRemove(workoutId).lean();
                    if (!deletedPlan) {
                        return res.status(404).json({ message: 'Workout plan not found' });
                    }
                    const response = {
                        data: Object.assign({}, deletedPlan),
                        message: "Workout deleted Successfully"
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
exports.WorkoutPlanController = WorkoutPlanController;
