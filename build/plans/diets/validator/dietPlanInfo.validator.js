"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dietPlanValidatorSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.dietPlanValidatorSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    dailyCalories: joi_1.default.number().integer().positive().required(),
    mealCalories: joi_1.default.object({
        breakfast: joi_1.default.number().integer().positive().required(),
        lunch: joi_1.default.number().integer().positive().required(),
        dinner: joi_1.default.number().integer().positive().required(),
        snacks: joi_1.default.number().integer().positive().required(),
    }).required(),
    dietaryRestrictions: joi_1.default.array().items(joi_1.default.string()),
    breakfast: joi_1.default.array().items(joi_1.default.string()),
    lunch: joi_1.default.array().items(joi_1.default.string()),
    dinner: joi_1.default.array().items(joi_1.default.string()),
    snacks: joi_1.default.array().items(joi_1.default.string()),
    influencer: joi_1.default.string().required(), // Assuming influencer is a string (you can update it to match your data model)
});
