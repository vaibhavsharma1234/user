"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlanDBModels = void 0;
const workout_schema_1 = require("../schemas/workout.schema");
const createPlanDBModels = (planDBModel) => {
    let Workout = planDBModel.model('Workout', workout_schema_1.WorkoutSchema);
    return {
        Workout
    };
};
exports.createPlanDBModels = createPlanDBModels;
