import { Request,Response,NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IAuthUser } from "../../store/interfaces/auth/user.interface";
const secret =process.env.SECRET_KEY
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-auth-token');
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, secret) as JwtPayload;
  
      // Ensure that the 'decoded' object contains the user data in the 'IUser' format
      const user: IAuthUser = decoded as IAuthUser;
      console.log("token value",decoded)
  
      // Attach the decoded user information to the request object
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };