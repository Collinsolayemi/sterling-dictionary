import { Request, Response, NextFunction } from 'express';

import { UnauthorizedException } from '../../utilis/errors/error.utilis';

class HandleRestriction {
  handleAdminRestriction = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userRole = req.user.role;
    if (userRole !== 'Admin') {
      throw new UnauthorizedException(
        'Sorry, only an admin can perform this action'
      );
    }
    next();
  };
}

export default new HandleRestriction();
