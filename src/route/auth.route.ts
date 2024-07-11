import { Router } from 'express';
import {
  forgetPassword_validation,
  login_validation,
  resetPassword_validation,
  signup_validation,
  verifyOtp_validation,
} from '../utilis/validation/user/user.validation';
import { AuthController } from '../controller/auth.controller';
import handleRestriction from '../middleware/role/user.role';

const router = Router();
const authController = new AuthController();

router.post('/onboard-user', signup_validation(), authController.onboardUser);
router.post('/onboard-admin', signup_validation(), authController.onboardAdmin);
router.post(
  '/onboard-subadmin',
  handleRestriction.handleAdminRestriction,
  signup_validation(),
  authController.onboardSubAdmin
);
router.post('/login', login_validation(), authController.login);

router.post(
  '/forget-password',
  forgetPassword_validation(),
  authController.forgetPassword
);

router.post('/verify-otp', verifyOtp_validation(), authController.verifyOtp);

router.post(
  '/reset-password',
  resetPassword_validation(),
  authController.resetPassword
);

export default router;
