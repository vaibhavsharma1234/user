import express from "express";

import { WorkoutPlanController } from "../controller";


export const workout_routes = express.Router();

workout_routes.post("/create",WorkoutPlanController.CreateWorkoutPlan)
workout_routes.get('/byInfluencer/:influencerId',WorkoutPlanController.GetAllWorkoutPlanByInfluencer)
workout_routes.put("/:workoutId",WorkoutPlanController.UpdateWorkoutPlan)
workout_routes.delete("/:workoutId",WorkoutPlanController.DeleteWorkoutPlan)
