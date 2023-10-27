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
}
exports.WorkoutPlanController = WorkoutPlanController;
