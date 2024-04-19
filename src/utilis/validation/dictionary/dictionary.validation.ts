import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

export const uploadNewWord_validation = () => {
  return [
    check('word').isString().withMessage('word is required'),
    check('meaning').isString().withMessage('meaning is required'),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
};
