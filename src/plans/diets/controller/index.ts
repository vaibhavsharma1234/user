import { Request, Response } from "express";
import { dietPlanValidatorSchema } from "../validator/dietPlanInfo.validator";
import { IDietPlan } from "../../../store/interfaces/diet/diet.interface";
import { DietPlanHelper } from "../helper";
import { EHTTPS_RESPONSE_CODE } from "../../../store/enums/HTTP_RESPONSE_CODE/responseCode.enum";
import { IError } from "../../../store/interfaces/response/error";
import { createPlanDbConnection } from "../../../DB/authConnection";
export class DietPlanController {
    static async CreateDietPlan(req: Request, res: Response) {
        try {
            // validate the data
            const data: IDietPlan = await dietPlanValidatorSchema.validateAsync(req.body)
            // helper will craete 
            const dietPlanInfo = await DietPlanHelper.CreationHelper(data)
            const response = {
                data: {
                    ...dietPlanInfo,

                },
                message: "diet Created Successfully"
            }

            return res
                .status(EHTTPS_RESPONSE_CODE.OK)
                .json(response)
            // send the response
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
    static async UpdateDietPlan(req: Request, res: Response) {
        try {
            const dietPlanId = req.params.dietPlanId
            const updatedDietPlan: IDietPlan = req.body;

            const dietPlanDetails = await DietPlanHelper.UpdationHelper(dietPlanId, updatedDietPlan)
            if (!dietPlanDetails) {
                return res.status(EHTTPS_RESPONSE_CODE.NOT_FOUND).json({ message: 'diet plan not found' });
            }
            const response = {
                data: {
                    ...dietPlanDetails,

                },
                message: "diet updated Successfully"
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
     static async GetAllDietPlanByInfluencer(req:Request,res:Response){
        try {
            const influencerId = req.params.influencerId
            const allDietPlan = await DietPlanHelper.GetAllDietsHelper(influencerId)
            const response = {
                data: {
                    ...allDietPlan,

                },
                message: "diets fetched Successfully"
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
     static async DeleteDietPlan(req:Request,res:Response){
        try{
            const dietPlanId =req.params.dietPlanId
            const {success,planDBModels}=createPlanDbConnection()
            if(success){
                const deletedPlan = await planDBModels.Diet.findByIdAndRemove(dietPlanId).lean();

                if(!deletedPlan){
                    return res.status(404).json({ message: 'diet plan not found' });
                }
                const response = {
                    data: {
                        ...deletedPlan,
    
                    },
                    message: "diet plan deleted Successfully"
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