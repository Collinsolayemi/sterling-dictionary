import { Request, Response, NextFunction } from 'express';
import { UnauthorizedException } from '../../utilis/errors/error.utilis';
import { AuthMiddleware } from '../token/token';
import { User } from '../../entity/user.entity';
import { Role } from '../../types/user/user';
import { asyncWrapper } from '../../utilis/errors/async.wrapper';

class HandleRestriction {
  handleAdminRestriction = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException('Please login');
      }

      const decoded = AuthMiddleware.verifyToken(token);
      const user = await User.findOne({ where: { email: decoded.userEmail } });
      const userRole = user?.role;

      if (userRole !== Role.ADMIN) {
        throw new UnauthorizedException(
          'Sorry, only an admin can perform this action'
        );
      }

      next();
    }
  );

  handleUserRestriction = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException('Please login');
      }

      const decoded = AuthMiddleware.verifyToken(token);
      const user = await User.findOne({ where: { email: decoded.userEmail } });
      const userRole = user?.role;

      if (userRole !== Role.USER) {
        throw new UnauthorizedException(
          'Sorry, only a user can perform this action'
        );
      }

      next();
    }
  );
}

const handleRestriction = new HandleRestriction();
export default handleRestriction;
