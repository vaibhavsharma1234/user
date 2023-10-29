import Joi from 'joi';

export const dietPlanValidatorSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  dailyCalories: Joi.number().integer().positive().required(),
  mealCalories: Joi.object({
    breakfast: Joi.number().integer().positive().required(),
    lunch: Joi.number().integer().positive().required(),
    dinner: Joi.number().integer().positive().required(),
    snacks: Joi.number().integer().positive().required(),
  }).required(),
  dietaryRestrictions: Joi.array().items(Joi.string()),
  breakfast: Joi.array().items(Joi.string()),
  lunch: Joi.array().items(Joi.string()),
  dinner: Joi.array().items(Joi.string()),
  snacks: Joi.array().items(Joi.string()),
  influencer: Joi.string().required(), // Assuming influencer is a string (you can update it to match your data model)
});
