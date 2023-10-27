import mongoose from "mongoose"

export interface IUser {
    _id?: mongoose.Types.ObjectId | String,
    name: string,
    emailId: string,
    username: string,
    phoneNumber: string,
    role: string,
    password:string,
    avatar?: string,

}
// username is missing 
export interface IAuthUser {
    _id: String,
    name: string,
  
    emailId: string,
    phoneNumber: string
    role: string,
    
  }