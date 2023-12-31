"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.workout_routes = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
exports.workout_routes = express_1.default.Router();
exports.workout_routes.post("/create", controller_1.WorkoutPlanController.CreateWorkoutPlan);
exports.workout_routes.get('/byInfluencer/:influencerId', controller_1.WorkoutPlanController.GetAllWorkoutPlanByInfluencer);
exports.workout_routes.put("/:workoutId", controller_1.WorkoutPlanController.UpdateWorkoutPlan);
exports.workout_routes.delete("/:workoutId", controller_1.WorkoutPlanController.DeleteWorkoutPlan);
// 
