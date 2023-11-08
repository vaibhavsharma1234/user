import { Request,Response } from "express";
import { createAuthDbConnection } from "../../DB/authConnection";
import { EHTTPS_RESPONSE_CODE } from "../../store/enums/HTTP_RESPONSE_CODE/responseCode.enum";
import { IAuthUser } from "../../store/interfaces/auth/user.interface";
import { generateNewToken } from "../helper";

import { userValidatorSchema } from "../../auth/validators/userInfo.validator";

export class UserProfileController {
    static async GetUserDetails(req:Request,res:Response){
        try {
            // The authenticated user's ID is available in req.user
            const { success, authDBModels } = createAuthDbConnection()
            if(success){
                console.log(req.user)
                const user:IAuthUser = await authDBModels.User.findOne({_id:req.user._id});
                
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
  const { username, emailId, name, phoneNumber } = req.body;
  const { success, authDBModels } = createAuthDbConnection();

  if (success) {
    // Validate the request body
    const { error, value } = userValidatorSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: 'Validation error', error: error.details });
    }

    try {
      const user = await authDBModels.User.findOne({ _id: req.user._id });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (value.username) {
        user.username = value.username;
      }
      if (value.emailId) {
        user.emailId = value.emailId;
      }
      if (value.name) {
        user.name = value.name;
      }
      if (value.phoneNumber) {
        user.phoneNumber = value.phoneNumber;
      }

      // Save the updated user data
      await user.save();

      // Generate a new token (if necessary)
      const token = generateNewToken(user);

      // Return the user's profile data, excluding sensitive information like the password
      const response = {
        data: {
          user,
          token: token, // Convert the Mongoose document to a plain JavaScript object
        },
        message: 'User Details updated Successfully',
      };

      return res.status(EHTTPS_RESPONSE_CODE.OK).json(response);
    } catch (error) {
      console.error(error);
      return res.status(EHTTPS_RESPONSE_CODE.SERVER_ERROR).json({ message: 'Internal server error' });
    }
  } else {
    throw new Error('Unable to connect to Auth db');
  }
}
}