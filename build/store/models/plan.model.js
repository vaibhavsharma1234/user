"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlanDBModels = void 0;
const workout_schema_1 = require("../schemas/workout.schema");
const diet_interface_1 = require("../schemas/diet.interface");
const createPlanDBModels = (planDBModel) => {
    let Workout = planDBModel.model('Workout', workout_schema_1.WorkoutSchema);
    let Diet = planDBModel.model("Diet", diet_interface_1.dietPlanSchema);
    return {
        Workout,
        Diet
    };
};
exports.createPlanDBModels = createPlanDBModels;
