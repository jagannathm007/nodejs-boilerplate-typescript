import { generateAccessToken } from './../../middlewares/auth.mw';
import { success, error } from './../../utils/response.util';
import { decryptPassword, encryptPassword } from './../../utils/encryptor.util';
import { Request, Response } from 'express';
import { users } from './../../models/users';


export const signIn = async (req: Request, res: Response) => {
  try {
    const { emailId, password } = req.body;
    let existing = await users.find({ email: emailId }).lean();
    if (existing.length == 1) {
      let plainText = decryptPassword(existing[0].password);
      if (plainText == password) {
        let userData: any = existing[0];
        userData.token = generateAccessToken({ _id: existing[0]._id });
        success("User loggedIn successfully!", userData, res);
      } else {
        success("Invalid credentials!", 0, res);
      }
    } else {
      success("Invalid credentials!", 0, res);
    }
  } catch (err: any) {
    error(err.message, res);
  }
}

export const signUp = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
    let existing = await users.find({ email: emailId }).lean();
    if (existing.length == 1) {
      success("Account is already created!", 0, res);
    } else {
      let hashPassword = encryptPassword(password);
      let user = {
        firstName,
        lastName,
        email: emailId,
        password: hashPassword
      }
      await users.create(user);
      success("Account created successfully!", 1, res);
    }
  } catch (err: any) {
    error(err.message, res);
  }
}