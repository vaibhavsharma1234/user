// models/workoutPlan.model.ts
import mongoose, { Schema, Document } from "mongoose";
import { IWorkout, IExercise } from "../interfaces/workouts/workout.interface";

const ExerciseSchema = new Schema<IExercise>({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    comment: { type: String }, // Optional comment for exercise instructions
});

export const WorkoutSchema = new Schema<IWorkout>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    exercises: { type: [ExerciseSchema], required: true },
    day: { type: String, required: true },
    sets: { type: Number, required: true },
    influencer: { type: mongoose.Schema.Types.ObjectId, ref: 'Influencer', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
WorkoutSchema.index({ 'influencer._id': 1, 'day': 1 });


// user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//     unique: true,
//   },
