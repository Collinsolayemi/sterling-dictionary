import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { NotFoundException, UnauthorizedException } from "../../utilis/errors/error.utilis";

import { asyncWrapper } from "../../utilis/errors/async.wrapper";
import { User } from '../../entity/user.entity';

export class AuthMiddleware {
    private static readonly secretKey = process.env.JWT_SECRET || '';
  
    static generateToken = async (userId: string, userEmail: string) => {
      const payload = { userId, userEmail };
      const secret = process.env.JWT_SECRET || '';
      const options = { expiresIn: '1h' };
  
      return jwt.sign(payload, secret, options);
    };
  
    static verifyToken(token: any): any {
      try {
        return jwt.verify(token, process.env.JWT_SECRET || '');
      } catch (error) {
        throw new UnauthorizedException('please log in again');
      }
    }
  
    static authenticate = asyncWrapper(
      async (req: Request, res: Response, next: NextFunction) => {
        let token = '';
  
        const headersReq = req.header('Authorization');
        if (headersReq && headersReq.startsWith('Bearer')) {
          token = headersReq.split(' ')[1];
        }
  
        if (!token) {
          throw new UnauthorizedException('You are not logged in');
        }
  
        const decoded = this.verifyToken(token);
  
        const user = await User.findOne({
          where: {
            email: decoded.userEmail,
          },
        });
  
        if (!user) {
          throw new NotFoundException('User not found');
        }
  
        req.user = user;
        next();
      }
    );
  }