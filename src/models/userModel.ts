import { Schema, model, connect } from 'mongoose';
import { IUser } from '../store/interfaces/auth/user.interface';
// export interface IUser {
//     name: string,
//     email: string,
//     username: string,
//     phoneNumber: string,
//     role: string,
//     avatar?: string,

// }

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    emailId: { type: String, required: true },
    username: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    role: { type: String, required: true },

    avatar: String
});
const UserModel = model<IUser>('User', userSchema);
export default UserModel