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
import EmailSender, { EmailOptions } from '../utilis/email/email';

export class AuthController {
  onboardUser = asyncWrapper(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userExist = await User.findOne({ where: { email } });

    if (userExist) {
      throw new EmailAlreadyExistsExeption('Email already exists');
    }

    const saltRounds = 10;

    const hashPassword = await bcrypt.hash(password, saltRounds);

    const user = new User();
    user.email = email;
    user.password = hashPassword;
    user.role = Role.USER;
    user.save();

    const accessTokens = await AuthMiddleware.generateTokens(
      user.id,
      user.email
    );

    const userRole = user.role;

    return res.status(201).json({ userRole, accessTokens });
  });

  onboardAdmin = asyncWrapper(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userExist = await User.findOne({ where: { email } });

    if (userExist) {
      throw new EmailAlreadyExistsExeption('Email already exists');
    }

    const saltRounds = 10;

    const hashPassword = await bcrypt.hash(password, saltRounds);

    const user = new User();
    user.email = email;
    user.password = hashPassword;
    user.role = Role.ADMIN;
    user.save();

    const accessTokens = await AuthMiddleware.generateTokens(
      user.id,
      user.email
    );

    const userRole = user.role;

    return res.status(201).json({ userRole, accessTokens });
  });

  onboardSubAdmin = asyncWrapper(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userExist = await User.findOne({ where: { email } });

    if (userExist) {
      throw new EmailAlreadyExistsExeption('Email already exists');
    }

    const saltRounds = 10;

    const hashPassword = await bcrypt.hash(password, saltRounds);

    const user = new User();
    user.email = email;
    user.password = hashPassword;
    user.role = Role.SUB_ADMIN;
    user.save();

    const accessTokens = await AuthMiddleware.generateTokens(
      user.id,
      user.email
    );

    const userRole = user.role;

    return res.status(201).json({ userRole, accessTokens });
  });

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

    const userRole = userExist.role;

    return res.status(200).json({ accessTokens, userRole });
  });

  async generateOtp() {
    const otp = Math.floor(Math.random() * 9000) + 1000;
    const otpString = otp.toString();
    return otpString;
  }

  forgetPassword = asyncWrapper(async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const otp = await this.generateOtp();
    const saltRounds = 10;
    const hashOtp = await bcrypt.hash(otp, saltRounds);

    user.resetPasswordOtp = hashOtp;
    user.resetPasswordExpires = Date.now() + 300000;

    await user.save();

    const emailSender = new EmailSender();

    const emailOptions: EmailOptions = {
      email: email,
      subject: 'Verification OTP',
      message: `Your verification OTP is ${otp}. Please use this OTP to verify your email.`,
    };

    emailSender.sendEmail(emailOptions);

    res
      .status(200)
      .json({ message: 'check your email for reset password OTP' });
  });

  resetPassword = asyncWrapper(async (req: Request, res: Response) => {
    const { otp, email, newPassword, confirmPassword } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isOtpMatch = await bcrypt.compare(otp, user.resetPasswordOtp);

    if (!isOtpMatch) {
      throw new BadRequestException('Otp Mismatch');
    }

    if (newPassword !== confirmPassword) {
      throw new BadRequestException('password does not match');
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update user's password
    user.password = hashPassword;
    user.resetPasswordOtp = '';
    user.resetPasswordExpires = null;
    await user.save();

    return res.status(200).json({ message: 'Password reset successfully' });
  });

  createSubAdmin = asyncWrapper(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userExist = await User.findOne({ where: { email } });

    if (userExist) {
      throw new EmailAlreadyExistsExeption('Email already exists');
    }

    const saltRounds = 10;

    const hashPassword = await bcrypt.hash(password, saltRounds);

    const user = new User();
    user.email = email;
    user.password = hashPassword;
    user.role = Role.SUB_ADMIN;
    user.save();

    const accessTokens = await AuthMiddleware.generateTokens(
      user.id,
      user.email
    );

    const userRole = user.role;

    return res.status(201).json({ userRole, accessTokens });
  });
}
