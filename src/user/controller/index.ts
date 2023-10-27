import { Request,Response } from "express";
import { createAuthDbConnection } from "../../DB/authConnection";
import { EHTTPS_RESPONSE_CODE } from "../../store/enums/HTTP_RESPONSE_CODE/responseCode.enum";
import { IAuthUser } from "../../store/interfaces/auth/user.interface";
import { generateNewToken } from "../helper";


export class UserProfileController {
    static async GetUserDetails(req:Request,res:Response){
        try {
            // The authenticated user's ID is available in req.user
            const { success, authDBModels } = createAuthDbConnection()
            if(success){
                console.log(req.user)
                const user:IAuthUser = await authDBModels.User.findOne({emailId:req.user.emailId});
                
              console.log("user",user)
                if (!user) {
                  return res.status(404).json({ message: 'User not found' });
                }
              
                // Return the user's profile data, excluding sensitive information like the password
                const response = {
                    data: {
                        user:user,
                       
                        
                    },
                    message: "User Detailed fetched Successfully"
                }
    
                return res
                    .status(EHTTPS_RESPONSE_CODE.OK)
                    .json(response)
            }else{
                throw new Error("Unable to connect to Auth db")
            }
           
          } catch (error) {
            console.error(error);
            return res.status(EHTTPS_RESPONSE_CODE.SERVER_ERROR).json({ message: 'Server error' });
          }
    }
    static async UpdateUserDetails(req: Request, res: Response) {
        const { username, emailId } = req.body;
        const { success, authDBModels } = createAuthDbConnection();
    
        if (success) {
            console.log(req.user);
            
            try {
                const user = await authDBModels.User.findOne({ emailId: req.user.emailId });
                
                
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                
                if (username) {
                    user.username = username;
                }
                if (emailId) {
                    user.emailId = emailId;
                }
                
                // Save the updated user data
                await user.save();
                console.log("iss",user)
                const token = generateNewToken(user);
    //             const updatedUser = {
    //                 data:{
    //                 ...user.toObject()
    //             } 


    //         }
    // console.log("updated user",updatedUser.data._doc)
                // Return the user's profile data, excluding sensitive information like the password
                const response = {
                    data: {
                        user:user,
                        token:token // Convert the Mongoose document to a plain JavaScript object
                    },
                    message: "User Details updated Successfully",
                };
    
                return res
                    .status(EHTTPS_RESPONSE_CODE.OK)
                    .json(response);
            } catch (error) {
                console.error(error);
                return res.status(EHTTPS_RESPONSE_CODE.SERVER_ERROR).json({ message: 'Internal server error' });
            }
        } else {
            throw new Error("Unable to connect to Auth db");
        }
    }
}