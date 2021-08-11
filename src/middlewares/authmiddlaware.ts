import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../config/authConfig';
import { Request, Response, NextFunction } from 'express'

export default async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    res.status(401).json({ msg: 'Token not provided !!' });
  }


  const [, token] = req.headers.authorization.split(' ');

  jwt.verify(token, authConfig.secret, (err, decoded)=> {
      if(err){
        return res.status(401).json('invalid token');
      }
      req.body.id= decoded.id;
      return next();
  });
};
