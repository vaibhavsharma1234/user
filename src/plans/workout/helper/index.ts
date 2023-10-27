import { IWorkout } from "../../../store/interfaces/workouts/workout.interface";
import { createPlanDbConnection } from "../../../DB/authConnection";

export class WorkoutPlanHelper{
    static async CreationHelper(data:IWorkout){
        try{
            const { success, planDBModels } = createPlanDbConnection()
            if(success){
                console.log("stored workout",data)
                const workoutInfo={
                    title:data.title,
                    description:data.description,
                    exercises:data.exercises,
                    influencer:data.influencer,
                    day:data.day,
                    sets:data.sets


                }
                const workoutDetails = new planDBModels.Workout(workoutInfo);
                console.log("after save",workoutDetails)

                await workoutDetails.save();
                return workoutDetails

            }else{
                throw new Error("Unable to connect to Plan db")
            }
        }
        catch(error){
            throw error
        }
    }
    static async GetAllWorkoutHelper(influencerId:string){
        try{
            const {success,planDBModels}=createPlanDbConnection()
            if(success){
                const workoutPlans= await planDBModels.Workout.find({influencer:influencerId})
                return workoutPlans

            }else{
                throw new Error("Unable to connect to Plan db")
            }

        }catch(error){
            throw error
        }
    }
    static async UpdationHelper(workoutId:string,updatedWorkoutPlan:IWorkout){
    try{
        const {success,planDBModels}=createPlanDbConnection()
        if(success){
            const updatePlan =planDBModels.Workout.findByIdAndUpdate(workoutId, { $set: updatedWorkoutPlan },
                { new: true })
            
            return updatePlan

        }else{
            throw new Error("Unable to connect to Plan db")
        }

    }catch(error){
        throw error
    }
    }
}