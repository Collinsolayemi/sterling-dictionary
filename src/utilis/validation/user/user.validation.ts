import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

export const signup_validation = () => {
  return [
    check('email').isEmail().withMessage('Input a valid email'),
    check('password').isString().withMessage('Password is not strong'),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
};

export const login_validation = () => {
  return [
    check('email').isEmail().withMessage('Email is required'),
    check('password').isString().withMessage('Password is required'),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
};

export const forgetPassword_validation = () => {
  return [
    check('email').isEmail().withMessage('Email is required'),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
};

export const resetPassword_validation = () => {
  return [
    check('email').optional(),
    check('otp').notEmpty().isString().withMessage('Otp is required'),
    check('newPassword')
      .notEmpty()
      .isString()
      .withMessage('New password is required'),
    check('confirmPassword')
      .notEmpty()
      .isString()
      .withMessage('confirm password is required'),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
};
