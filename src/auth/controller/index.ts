import { IUser } from "../../store/interfaces/auth/user.interface";
import { Request, Response  } from 'express';
import { LoginRegisterHelper } from "../helper";
import { userValidatorSchema } from "../validators/userInfo.validator";
import { EHTTPS_RESPONSE_CODE } from "../../store/enums/HTTP_RESPONSE_CODE/responseCode.enum";
export class LoginRegisterController {
    static async Register(req: Request, res: Response) {
        try {
            // validate the data 
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
                .status(201)
                .json(response)
        }
        catch (error) {
            return res
            .status(error.statusCode? error.statusCode : EHTTPS_RESPONSE_CODE.SERVER_ERROR)
            .json({failed:true});

        }
    }
}