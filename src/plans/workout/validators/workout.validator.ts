const Joi = require('joi');

export const workoutPlanValidatorSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  exercises: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      reps: Joi.number().integer().positive().required(),
      comment: Joi.string(),
    })
  ).required(),
  sets: Joi.number().integer().positive().required(),
  day: Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday').required(),
  influencer: Joi.string().required(), // Assuming influencerId is a string
});
