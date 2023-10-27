import { createAuthDbConnection } from "../../DB/authConnection";
import { IUser } from "../../store/interfaces/auth/user.interface";
import { IInfluencer } from "../../store/interfaces/influencer/influencer.interface";

export class InfluencerHelper {

    static async CreationHelper(data: IInfluencer) {
        // get the data from the db of user
        try{
            const { success, authDBModels } = createAuthDbConnection()
            console.log("success", success)
            if (success) {
    
    
                const influencer = new authDBModels.Influencer(data);
                console.log("after save influencer", influencer)
                await authDBModels.User.findByIdAndUpdate(influencer.user, { role: "influencer" });
    
                await influencer.save();
                const influencerx = await authDBModels.Influencer.findById(influencer._id).populate('user');
                return influencerx
            }else {
                throw new Error("Unable to connect to Auth db")
            }
        }catch(error) {
            throw (error)
        }
      


    }
    static async GetInfluencerProfile(influencerId:string){
        try{
            const { success, authDBModels } = createAuthDbConnection()
            console.log("success", success)
            if (success) {
                const influencerDetails = await authDBModels.Influencer.findById(influencerId).populate('user');
                console.log("influerncer details from get influencer",influencerDetails)
                return influencerDetails
            }
            else {
                throw new Error("Unable to connect to Auth db")
            }
        }catch(error){
            throw (error)
        }

    }
}