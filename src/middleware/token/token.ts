import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {
  NotFoundException,
  UnauthorizedException,
} from '../../utilis/errors/error.utilis';

import { asyncWrapper } from '../../utilis/errors/async.wrapper';
import { User } from '../../entity/user.entity';

export class AuthMiddleware {
//   static generateToken = async (userId: string, userEmail: string) => {
//     const payload = { userId, userEmail };
//     const secret = process.env.JWT_SECRET || '';
//     const options = { expiresIn: '1h' };

//     return jwt.sign(payload, secret, options);
    //   };
    
    static generateTokens = async (userId: string, userEmail: string) => {
        const accessTokenPayload = { userId, userEmail };
        const refreshTokenPayload = { userId, userEmail };
    
        const accessTokenSecret = process.env.JWT_SECRET || '';
        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || '';
    
        const accessTokenOptions = { expiresIn: '1h' };
        const refreshTokenOptions = { expiresIn: '7d' }; 
    
        const accessToken = jwt.sign(accessTokenPayload, accessTokenSecret, accessTokenOptions);
        const refreshToken = jwt.sign(refreshTokenPayload, refreshTokenSecret, refreshTokenOptions);
    
        return { accessToken, refreshToken };
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
