import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { asyncWrapper } from '../utilis/errors/async.wrapper';
import { User } from '../entity/user.entity';
import {
  EmailAlreadyExistsExeption,
  NotFoundException,
} from '../utilis/errors/error.utilis';

export class AuthController {
  signup = asyncWrapper(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userExist = await User.findOne({ where: { email } });

    if (userExist) {
      throw new EmailAlreadyExistsExeption('Email already exists');
    }

    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User();
    user.email = email;
    user.password = hashedPassword;

    user.save();
    return res.status(201).json({ message: 'User created successfully' });
  });

  signUpWithGoogleAccount = asyncWrapper(async (req: Request, res: Response) => {});

  login = asyncWrapper(async (req: Request, res: Response) => {
    const { email } = req.body;

    const userExist = await User.findOne({ where: { email } });

    if (!userExist) {
      throw new NotFoundException('User not found');
    }

    return res.status(201).json({ message: 'User logged in succesfully' });
  });
}
