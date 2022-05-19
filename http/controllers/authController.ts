import AuthService from "../../app/application/auth/authService";
import handleError from "../../app/infrastructure/mysqlrepositories/repositries/exceptions/errorHandler";

class JwtAuthController {

    static async login (req: any,res: any) {   
        try {
            const {body:{email,password}} = req
            const response =await AuthService.login(email,password)
            res.status(200).send(response)
           
        } catch (err: any) {
           return handleError(err, res);
        }
     }
     static async logout (req: any,res: any) {  
        let refreshTokens: any = []
        refreshTokens = refreshTokens.filter((token: any) => token !== req.body.token)
     }


}
export default JwtAuthController