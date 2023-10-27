import { IAuthUser} from "../../store/interfaces/auth/user.interface";
import jwt from "jsonwebtoken";
const secret =process.env.SECRET_KEY

export function generateNewToken(user:IAuthUser) {
    console.log("user from genrerate ",user)
    console.log("user id",user._id.toString())


    const userInfo: IAuthUser = { 
        _id: user._id.toString(),
        name: user.name,
       
        emailId: user.emailId,
        phoneNumber: user.phoneNumber,
        role: user.role
    }
  
    // Sign the new token with the updated user data
    const token = jwt.sign(userInfo, secret, { expiresIn: '1d' }); // Adjust the expiration time as needed
  
    return token;
  }