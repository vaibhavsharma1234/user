import { Request, Response } from "express";
import { IWorkout } from "../../../store/interfaces/workouts/workout.interface";
import { workoutPlanValidatorSchema } from "../validators/workout.validator";
import { WorkoutPlanHelper } from "../helper";
import { EHTTPS_RESPONSE_CODE } from "../../../store/enums/HTTP_RESPONSE_CODE/responseCode.enum";
import { IError } from "../../../store/interfaces/response/error";
import { createPlanDbConnection } from "../../../DB/authConnection";

export class WorkoutPlanController {
    static async CreateWorkoutPlan(req: Request, res: Response) {
        try {
            // validate the data that came 
            const data: IWorkout = await workoutPlanValidatorSchema.validateAsync(req.body)
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
        } catch (error) {
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
    static async GetAllWorkoutPlanByInfluencer(req: Request, res: Response) {
        try {
            const influencerId = req.params.influencerId
            const allWorkoutPlan = await WorkoutPlanHelper.GetAllWorkoutHelper(influencerId)
            const response = {
                data: {
                    ...allWorkoutPlan,

                },
                message: "Workouts fetched Successfully"
            }

            return res
                .status(EHTTPS_RESPONSE_CODE.OK)
                .json(response)

        } catch (error) {
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
    static async UpdateWorkoutPlan(req: Request, res: Response) {
        try {
            const workoutId = req.params.workoutId
            const updatedWorkoutPlan: IWorkout = req.body;

            const workoutPlanDetails = await WorkoutPlanHelper.UpdationHelper(workoutId, updatedWorkoutPlan)
            if (!workoutPlanDetails) {
                return res.status(EHTTPS_RESPONSE_CODE.NOT_FOUND).json({ message: 'Workout plan not found' });
            }
            const response = {
                data: {
                    ...workoutPlanDetails,

                },
                message: "Workouts updated Successfully"
            }

            return res
                .status(EHTTPS_RESPONSE_CODE.OK)
                .json(response)

        } catch (error) {
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
    static async DeleteWorkoutPlan(req:Request,res:Response){
        try{
            const workoutId =req.params.workoutId
            const {success,planDBModels}=createPlanDbConnection()
            if(success){
                const deletedPlan = await planDBModels.Workout.findByIdAndRemove(workoutId).lean();

                if(!deletedPlan){
                    return res.status(404).json({ message: 'Workout plan not found' });
                }
                const response = {
                    data: {
                        ...deletedPlan,
    
                    },
                    message: "Workout deleted Successfully"
                }
    
                return res
                    .status(EHTTPS_RESPONSE_CODE.OK)
                    .json(response)
    

            }else{
                throw new Error("Unable to connect to Plan db")
            }
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