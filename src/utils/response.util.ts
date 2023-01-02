import { Response } from 'express';

export const success = (message: String, data: any, res: Response) => {
  res.json({
    message, data,
    isSuccess: true,
    status: 200
  });
  res.end();
}

export const error = (error: String, res: Response) => {
  res.json({
    message: error,
    data: 0,
    isSuccess: false,
    status: 500
  });
  res.end();
}

export const pageNotFound = (res: Response) => {
  res.json({
    message: "The request url is not available!",
    data: 0,
    isSuccess: false,
    status: 404
  });
  res.end();
}

export const unauthorizedRequest = (res: Response) => {
  res.json({
    message: "unauthorized request!",
    data: 0,
    isSuccess: false,
    status: 401
  });
  res.end();
}