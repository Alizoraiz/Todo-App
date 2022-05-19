import AuthInfraStructureService from "../../app/infrastructure/services/jwtService";

class AuthMiddleware {
    static async authenticate(req: any, res: any, next: any) {
        try {
            const {authorization:{headers}} = req
            if (headers) {
                const token = req.headers.authorization.split(' ')[1];
                const result = await AuthInfraStructureService.verifyToken(token);
          
                if (result) {
                  next();
                } else {
                  res.status(401).json({
                    message: 'You are not logged in!',
                  });
                }
              } else {
                res.status(401).json({
                  message: 'You are not logged in!',
                });
              }
        } catch (error) {
            
        }
    }
}
export default AuthMiddleware