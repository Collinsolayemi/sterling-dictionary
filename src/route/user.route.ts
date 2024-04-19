import { Router } from 'express';
import {
  login_validation,
  signup_validation,
} from '../utilis/validation/user/user.validation';
import { AuthController } from '../controller/auth.controller';

const router = Router();
const authController = new AuthController();

router.post('/create-user', signup_validation(), authController.signup);

router.post('/login', login_validation(), authController.login);

export default router;
