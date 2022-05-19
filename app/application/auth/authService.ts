import CustomError from '../../infrastructure/mysqlrepositories/repositries/exceptions/customError';
import UserRepositry from '../../infrastructure/mysqlrepositories/repositries/UserRepositry';
import AuthInfraStructureService from '../../infrastructure/services/jwtService';
import { injectable, inject } from 'inversify';
//import TYPES from '../../infrastructure/inversify/types';
//import myContainer from '../../infrastructure/inversify/inversifyConfig'
require('dotenv').config();
//const authInfraStructureService = myContainer.get<AuthInfraStructureService>(AuthInfraStructureService);


class AuthService {
    //public authInfraStructureService: AuthInfraStructureService
    //constructor(@inject(TYPES.AuthInfrastructureService) authInfraStructureService: AuthInfraStructureService) {this.authInfraStructureService = authInfraStructureService}
    public refreshTokens: any = [];
    
    static login = async(email: string, password:string) => {
        try{
            //Authenticate Users
            const user =await UserRepositry.findByEmail(email)
            if(!user)
            throw new CustomError(400, 'No such user exists'); 
            if(password != user.password)
            throw new CustomError(400, 'Password doesnt match'); 

            //generate token
            
            const accessToken: string = AuthInfraStructureService.generateAccessToken(user)
            const refreshToken: string = AuthInfraStructureService.generateRefreshToken(user)
            return({ accessToken: accessToken,refreshToken:refreshToken, user})

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    }
}
export default AuthService