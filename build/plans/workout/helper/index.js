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
exports.WorkoutPlanHelper = void 0;
const authConnection_1 = require("../../../DB/authConnection");
class WorkoutPlanHelper {
    static CreationHelper(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { success, planDBModels } = (0, authConnection_1.createPlanDbConnection)();
                if (success) {
                    console.log("stored workout", data);
                    const workoutInfo = {
                        title: data.title,
                        description: data.description,
                        exercises: data.exercises,
                        influencer: data.influencer,
                        day: data.day,
                        sets: data.sets
                    };
                    const workoutDetails = new planDBModels.Workout(workoutInfo);
                    console.log("after save", workoutDetails);
                    yield workoutDetails.save();
                    return workoutDetails;
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
    static GetAllWorkoutHelper(influencerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { success, planDBModels } = (0, authConnection_1.createPlanDbConnection)();
                if (success) {
                    const workoutPlans = yield planDBModels.Workout.find({ influencer: influencerId });
                    return workoutPlans;
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
    static UpdationHelper(workoutId, updatedWorkoutPlan) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { success, planDBModels } = (0, authConnection_1.createPlanDbConnection)();
                if (success) {
                    const updatePlan = planDBModels.Workout.findByIdAndUpdate(workoutId, { $set: updatedWorkoutPlan }, { new: true });
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
}
exports.WorkoutPlanHelper = WorkoutPlanHelper;
