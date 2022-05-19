import jwt from 'jsonwebtoken'
import { injectable } from 'inversify';
require('dotenv').config();

// app.use(express.json());

class AuthInfraStructureService{
  
    static generateAccessToken(user: any){
        return jwt.sign({data:user}, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: '30s'})
    }
    static generateRefreshToken(user: any){
        return jwt.sign({data:user}, process.env.REFRESH_TOKEN_SECRET as string, {expiresIn: '1h'})
    }

    static verifyToken(bearerToken:any) {
        try {
          const response = jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET as string);
          if (!response) {
            return false;
          }
          return true;
        } catch (err) {
          return false;
        }
      }
 
}

export default AuthInfraStructureService