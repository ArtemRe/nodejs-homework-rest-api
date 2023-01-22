const express = require('express');
const {
  singup,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require('../../controllers/usersController');

const ctrlWrapper = require('../../helper/apiHelpers');
const authenticate = require('../../middlewares/authenticate ');
const resizeAvartar = require('../../middlewares/resizeAvatar');
const upload = require('../../middlewares/upload');
const { validator } = require('../../middlewares/validator');
const { schemas } = require('../../models/users');

const router = express.Router();

router.post('/signup', validator(schemas.signupSchema), ctrlWrapper(singup));
router.post('/login', validator(schemas.loginSchema), ctrlWrapper(login));
router.get('/logout', authenticate, ctrlWrapper(logout));
router.get('/current', authenticate, ctrlWrapper(getCurrentUser));
router.patch(
  '/',
  authenticate,
  validator(schemas.subscriptionSchema),
  ctrlWrapper(updateSubscription)
);
router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrlWrapper(resizeAvartar),
  ctrlWrapper(updateAvatar)
);
router.get('/verify/:verificationToken', ctrlWrapper(verifyEmail));
router.post(
  '/verify',
  validator(schemas.verifyEmailShema),
  ctrlWrapper(resendVerifyEmail)
);

module.exports = router;
