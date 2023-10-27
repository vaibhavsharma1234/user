import mongoose from "mongoose";

import { IWorkout } from "../interfaces/workouts/workout.interface";
import { WorkoutSchema } from "../schemas/workout.schema";


export const createPlanDBModels = (planDBModel: mongoose.Connection) => {
    let Workout: mongoose.Model<IWorkout> = planDBModel.model('Workout',WorkoutSchema);
    
   
  
    return {
     Workout
    }
  }