import mongoose from "mongoose";

import { IWorkout } from "../interfaces/workouts/workout.interface";
import { WorkoutSchema } from "../schemas/workout.schema";
import { dietPlanSchema } from "../schemas/diet.interface";
import { IDietPlan } from "../interfaces/diet/diet.interface";

export const createPlanDBModels = (planDBModel: mongoose.Connection) => {
    let Workout: mongoose.Model<IWorkout> = planDBModel.model('Workout',WorkoutSchema);
    let Diet: mongoose.Model<IDietPlan>=planDBModel.model("Diet",dietPlanSchema)
    
   
  
    return {
     Workout,
     Diet
    }
  }