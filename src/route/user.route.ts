import { Router } from 'express';
import {
  forgetPassword_validation,
  login_validation,
  resetPassword_validation,
  signup_validation,
} from '../utilis/validation/user/user.validation';
import { AuthController } from '../controller/auth.controller';

const router = Router();
const authController = new AuthController();

router.post('/signup', signup_validation(), authController.signup);

router.post('/login', login_validation(), authController.login);

router.post(
  '/forget-password',
  forgetPassword_validation(),
  authController.forgetPassword
);

router.post(
  '/reset-password',
  resetPassword_validation,
  authController.resetPassword
);

export default router;
