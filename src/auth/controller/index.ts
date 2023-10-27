import { IUser } from "../../store/interfaces/auth/user.interface";
import { IError } from "../../store/interfaces/response/error";
import { Request, Response } from 'express';
import { LoginRegisterHelper } from "../helper";
import { userValidatorSchema } from "../validators/userInfo.validator";
import { EHTTPS_RESPONSE_CODE } from "../../store/enums/HTTP_RESPONSE_CODE/responseCode.enum";
import { userLoginValidatorSchema } from "../validators/userLogin.validator";
export class LoginRegisterController {
    static async Register(req: Request, res: Response) {
        try {
            // validate the data 
            // console.log(req)
            const data: IUser = await userValidatorSchema.validateAsync(req.body);

            // register helper
            const userInfo: IUser = await LoginRegisterHelper.RegisterHelper(data);
            const response = {
                data: {
                    ...userInfo,
                    password: undefined,
                    firebaseToken: undefined
                },
                message: "User Registered Successfully"
            }

            return res
                .status(EHTTPS_RESPONSE_CODE.OK)
                .json(response)
        }
        catch (error) {
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
    static async Login(req: Request, res: Response) {
        try{
              // user validation
            const { emailId, phoneNumber, password } = await userLoginValidatorSchema.validateAsync(req.body);

            // login helper 
            const { user, bearerToken, } = await LoginRegisterHelper.LoginHelper({ emailId, phoneNumber, password });
            res.status(EHTTPS_RESPONSE_CODE.OK).json({
                token: user._id.toString(),
                bearerToken,
                data: {
                    name: user.name,
    
                    emailId: user.emailId,
                    phoneNumber: user.phoneNumber,
    
                }
            });
        }catch(error){
            let response: IError = {
                data: [],
                message: error.message,
                meta: {
                  error: true
                }
              }
        
              return res
                      .status(error.statusCode? error.statusCode: EHTTPS_RESPONSE_CODE.SERVER_ERROR)
                      .json(response);
            }
        
      
        

    }
}