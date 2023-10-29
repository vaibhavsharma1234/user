import mongoose, { Schema, Document } from "mongoose";

export interface IDietPlan extends Document {
  name: string;
  description: string;
 
  dailyCalories: number;
  mealCalories: {
    breakfast: number;
    lunch: number;
    dinner: number;
    snacks: number;
  };
  dietaryRestrictions: string[];
 
 
  breakfast: string[];
  lunch: string[];
  dinner: string[];
  snacks: string[];
  influencer: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}





