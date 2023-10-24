import mongoose from "mongoose";
import { IUser } from "../interfaces/auth/user.interface"; 



export const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
   
    emailId: {
      type: String,
      required: true,
      unique: true
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: false,
     
    }
   
  },
  {
    timestamps: true
  }
);