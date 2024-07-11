import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

export const uploadNewWord_validation = () => {
  return [
    check('word').isString().withMessage('word is required'),
    check('meaning').isString().withMessage('meaning is required'),
    check('link').optional().isString().withMessage('link must be a string'),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
};

export const editExistingWord_validation = () => {
  return [
    check('id').isString().withMessage('id is required'),
    check('word').optional().isString().withMessage('word must be a string'),
    check('meaning')
      .optional()
      .isString()
      .withMessage('meaning must be a string'),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
};

export const deleteWord_validation = () => {
  return [
    check('id').isString().withMessage('id must be a string'),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
};

export const searchWord_validation = () => {
  return [
    check('word').isString().withMessage('id must be a string'),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
};