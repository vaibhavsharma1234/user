import { IAuthUser } from "../auth/user.interface";

declare module 'express-serve-static-core' {
    interface Request {
      user: IAuthUser;
    }
  }
  