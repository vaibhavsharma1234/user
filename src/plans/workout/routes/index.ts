import express from "express";

import { WorkoutPlanController } from "../controller";


export const workout_routes = express.Router();

workout_routes.post("/create",WorkoutPlanController.CreateWorkoutPlan)
