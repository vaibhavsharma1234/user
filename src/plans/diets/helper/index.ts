import { createPlanDbConnection } from "../../../DB/authConnection";
import { IDietPlan } from "../../../store/interfaces/diet/diet.interface";

export class DietPlanHelper{
    static async CreationHelper(dietInfo:IDietPlan){
        try{
            const {success,planDBModels}=createPlanDbConnection()
            if(success){
                console.log("diet",dietInfo)
                const dietPlanInfo = {
                    name:dietInfo.name,
                    description:dietInfo.description,
                    dailyCalories:dietInfo.dailyCalories,
                    mealCalories:dietInfo.mealCalories,
                    dietaryRestrictions:dietInfo.dietaryRestrictions,
                    breakfast:dietInfo.breakfast,
                    lunch:dietInfo.lunch,
                    snacks:dietInfo.snacks,
                    dinner:dietInfo.dinner,
                    influencer:dietInfo.influencer,

                }
                const dietPlanDetails = new planDBModels.Diet(dietPlanInfo);
                console.log("after save",dietPlanDetails)

                await dietPlanDetails.save();
                return dietPlanDetails

            }else{
                throw new Error("Unable to connect to Plan db")
            }
            
        }catch(error){
            throw (error)
        }
    }
    static async UpdationHelper(dietPlanid:string,updatedDietPlan:IDietPlan){
        try{
            const {success,planDBModels}=createPlanDbConnection()
            if(success){
                const updatePlan =planDBModels.Diet.findByIdAndUpdate(dietPlanid, { $set: updatedDietPlan },
                    { new: true })
                
                return updatePlan
    
            }else{
                throw new Error("Unable to connect to Plan db")
            }
    
        }catch(error){
            throw error
        }
    }
    static async GetAllDietsHelper(influencerId:string){
        try{
            const {success,planDBModels}=createPlanDbConnection()
            if(success){
                const dietPlans= await planDBModels.Diet.find({influencer:influencerId})
                return dietPlans

            }else{
                throw new Error("Unable to connect to Plan db")
            }

        }catch(error){
            throw error
        }
    }
}