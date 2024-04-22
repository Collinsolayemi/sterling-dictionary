import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { asyncWrapper } from '../utilis/errors/async.wrapper';
import { User } from '../entity/user.entity';
import {
  BadRequestException,
  EmailAlreadyExistsExeption,
  NotFoundException,
} from '../utilis/errors/error.utilis';
import { AuthMiddleware } from '../middleware/token/token';
import { Role } from '../types/user/user';

export class AuthController {
  signup = asyncWrapper(async (req: Request, res: Response) => {
    const { email, password, role } = req.body;

    const userExist = await User.findOne({ where: { email } });

    if (userExist) {
      throw new EmailAlreadyExistsExeption('Email already exists');
    }

    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User();
    user.email = email;
    user.password = hashedPassword;
    user.role = role ? Role.ADMIN : Role.USER;

    user.save();
    return res.status(201).json({ message: 'User created successfully' });
  });

  signUpWithGoogleAccount = asyncWrapper(
    async (req: Request, res: Response) => {}
  );

  comparePassword = async (inputPassword: string, email: string) => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordMatch = await bcrypt.compare(inputPassword, user.password);

    if (!isPasswordMatch) {
      throw new BadRequestException('Password Incorrect');
    }
  };

  login = asyncWrapper(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userExist = await User.findOne({ where: { email } });

    if (!userExist) {
      throw new NotFoundException('User not found');
    }

    await this.comparePassword(password, email);

    const accessTokens = await AuthMiddleware.generateTokens(
      userExist.id,
      userExist.email
    );

    return res.status(200).json({ accessTokens });
  });

  createSubAdmin = asyncWrapper(async (req: Request, res: Response) => { })
}
