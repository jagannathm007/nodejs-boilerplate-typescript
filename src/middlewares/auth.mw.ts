import { unauthorizedRequest } from './../utils/response.util';
import { sign, verify, } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';

export const generateAccessToken = (userData: any) => {
  return sign(userData, process.env.SESSION_KEY || '', {
    expiresIn: process.env.SESSION_EXP_IN_DAYS + 'd'
  });
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    verify(token, process.env.SESSION_KEY || '', (err, auth) => {
      if (err) {
        return unauthorizedRequest(res);
      } else {
        req.body.token = auth;
        next();
      }
    });
  } else {
    return unauthorizedRequest(res);
  }
}