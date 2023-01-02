import { Request, Response } from 'express';
import { error } from './../../utils/response.util';

export const signIn = (req: Request, res: Response) => {
  try {

  } catch (err: any) {
    error(err.message, res);
  }
}

export const signUp = (req: Request, res: Response) => {
  try {

  } catch (err: any) {
    error(err.message, res);
  }
}