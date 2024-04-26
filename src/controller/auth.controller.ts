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
import { randomBytes } from 'crypto';
import EmailSender, { EmailOptions } from '../utilis/email/email';

export class AuthController {
  signup = asyncWrapper(async (req: Request, res: Response) => {
    const { email, password, role } = req.body;

    const userExist = await User.findOne({ where: { email } });

    if (userExist) {
      throw new EmailAlreadyExistsExeption('Email already exists');
    }

    const saltRounds = 10;

    const hashPassword = await bcrypt.hash(password, saltRounds);

    const user = new User();
    user.email = email;
    user.password = hashPassword;
    user.role = role ? Role.ADMIN : Role.USER;
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

    return res.status(200).json({ accessTokens });
  });

  async generateResetToken() {
    // Generate a random buffer of bytes
    const buffer = randomBytes(32);
    // Convert the buffer to a hexadecimal string
    const token = buffer.toString('hex');

    return token;
  }

  forgetPassword = asyncWrapper(async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const resetToken = await this.generateResetToken();

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const resetLink = `http://localhost:3000/api-docs?token=${resetToken}`;

    const emailSender = new EmailSender();

    const emailOptions: EmailOptions = {
      email: email,
      subject: 'Verification OTP',
      message: `Please click ${resetLink} to verify your email.`,
    };

    emailSender.sendEmail(emailOptions);

    res
      .status(200)
      .json({ message: 'check your email for reset password link' });
  });

  resetPassword = asyncWrapper(async (req: Request, res: Response) => {
    const { token, newPassword } = req.body;

    // Find the user by reset token
    const user = await User.findOne({ where: { resetPasswordToken: token } });

    if (!user) {
      return res.status(404).json({ message: 'Invalid reset token' });
    }

    // Update user's password
    user.password = newPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    return res.status(200).json({ message: 'Password reset successfully' });
  });

  createSubAdmin = asyncWrapper(async (req: Request, res: Response) => {});
}
