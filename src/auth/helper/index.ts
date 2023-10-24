import { IUser } from "../../store/interfaces/auth/user.interface";
import bcrypt from "bcrypt";
import { createAuthDbConnection } from "../../DB/authConnection";

export class LoginRegisterHelper {
    static async RegisterHelper(data: IUser): Promise<IUser> {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10);

            const { success, authDBModels } = createAuthDbConnection()
            if(success){
               
                
                const userInfo: IUser = { 
                    name: data.name,
                    username:data.username,
                  
                    emailId: data.emailId,
                    phoneNumber: data.phoneNumber,
                    password: hashedPassword,
                   role:data.role
                }
                const user = new authDBModels.User(userInfo);

                await user.save();
                return userInfo

            } else {
                throw new Error("Unable to connect to Auth db")
            }
        } catch(error) {
            throw (error)
        }
    }
}