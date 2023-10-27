import mongoose from "mongoose";

export interface IWorkout{
    _id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    exercises: Array<IExercise>;
    sets: number;
    day:string,
    influencer: mongoose.Schema.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface IExercise {
    name: string;
    reps: number;
    comment?: string; // Optional comment field for exercise instructions
  }