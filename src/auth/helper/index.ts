import { IUser ,IAuthUser} from "../../store/interfaces/auth/user.interface";
import bcrypt from "bcrypt";
import { createAuthDbConnection } from "../../DB/authConnection";
import { EHTTPS_RESPONSE_CODE } from "../../store/enums/HTTP_RESPONSE_CODE/responseCode.enum";
import { CustomError } from "../../store/error/customError";
import jwt from "jsonwebtoken";

export class LoginRegisterHelper {
    static async RegisterHelper(data: IUser): Promise<IUser> {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10);

            const { success, authDBModels } = createAuthDbConnection()
            console.log("success",success)
            if(success){
                console.log("stored",data)
               
                
                const userInfo: IUser = { 
                    name: data.name,
                    username:data.username,
                  
                    emailId: data.emailId,
                    phoneNumber: data.phoneNumber,
                    password: hashedPassword,
                   role:data.role
                }
                const user = new authDBModels.User(userInfo);
                console.log("after save",user)

                await user.save();
                return userInfo

            } else {
                throw new Error("Unable to connect to Auth db")
            }
        } catch(error) {
            throw (error)
        }
    }
    static async LoginHelper({ emailId, phoneNumber, password }) {
        try{
            const {success, authDBModels } = createAuthDbConnection()
            if(!success){
                throw new Error("Unable to connect to Auth db")
            }
            const searchFilter = emailId? { emailId } : phoneNumber? { phoneNumber } : null;

            const user: IUser = await authDBModels.User.findOne(searchFilter).lean();
            if (!user) {
                throw new CustomError('Authentication failed', EHTTPS_RESPONSE_CODE.UNAUTHORIZED_ACCESS);
            }
            // const access = await authDBModels.Access.findOne({token: user.roleToken}).lean();
        
        
            const passwordMatch = await bcrypt.compare(password, user.password as string);
        
            if (!passwordMatch) {
                throw new CustomError('Authentication failed', EHTTPS_RESPONSE_CODE.UNAUTHORIZED_ACCESS);
            }

            const userInfo: IAuthUser = { 
                _id: user._id.toString(),
                name: user.name,
               
                emailId: user.emailId,
                phoneNumber: user.phoneNumber,
                role: user.role
            }
        
            const bearerToken = jwt.sign(userInfo, process.env.SECRET_KEY, {
                expiresIn: '10d', // Token expires in 10 days, adjust as needed
            });

            return {
                user,
                bearerToken,
                
            }

        } catch(error){ 
            throw (error) 
        }
    }
}