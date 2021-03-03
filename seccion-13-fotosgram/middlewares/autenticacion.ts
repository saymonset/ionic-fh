import { Response, Request, NextFunction} from 'express';
import Token from '../classes/toke';

export const verificaToken = (req: Request, res: Response, next: NextFunction)=>{

    const userToken  = req.get('x-token') || '';

      Token.comprobarToken(userToken)
      .then( (decode: any) =>{
          console.log('Decode', decode);
          req.usuario = decode.usuario;
          next();
      } ).catch(err=>{
          res.json({
              ok: false,
              mensaje: 'Token no es correcto'
          });
      });
}