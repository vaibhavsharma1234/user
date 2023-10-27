import { Request,Response } from "express";
import { IWorkout } from "../../../store/interfaces/workouts/workout.interface";
import { workoutPlanValidatorSchema } from "../validators/workout.validator";
import { WorkoutPlanHelper } from "../helper";
import { EHTTPS_RESPONSE_CODE } from "../../../store/enums/HTTP_RESPONSE_CODE/responseCode.enum";
import { IError } from "../../../store/interfaces/response/error";

export class WorkoutPlanController{
    static async CreateWorkoutPlan(req:Request,res:Response){
        try{
             // validate the data that came 
     const data:IWorkout  = await workoutPlanValidatorSchema.validateAsync(req.body)
     // workout plan creator helper
    const workoutPlanDetails = await WorkoutPlanHelper.CreationHelper(data)
    const response = {
        data: {
            ...workoutPlanDetails,
            
        },
        message: "Workout created Successfully"
    }

    return res
        .status(EHTTPS_RESPONSE_CODE.OK)
        .json(response)
        }catch(error){
            let response: IError = {
                data: [],
                message: error.message,
                meta: {
                    error: true
                }
            }



            return res
                .status(error.statusCode ? error.statusCode : EHTTPS_RESPONSE_CODE.SERVER_ERROR)
                .json(response);
        }
    
    }
}