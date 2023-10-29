import { IDietPlan } from "../interfaces/diet/diet.interface";
import mongoose, { Schema } from "mongoose";
export const dietPlanSchema = new Schema<IDietPlan>({
    name: { type: String, required: true },
    description: { type: String, required: true },

    dailyCalories: { type: Number, required: true },
    mealCalories: {
        breakfast: { type: Number, required: true },
        lunch: { type: Number, required: true },
        dinner: { type: Number, required: true },
        snacks: { type: Number, required: true },
    },
    dietaryRestrictions: [String],
    breakfast: [String],
    lunch: [String],
    dinner: [String],
    snacks: [String],
    influencer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Influencer",
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});