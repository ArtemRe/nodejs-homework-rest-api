const express = require('express');

const {
  singup,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
} = require('../../controllers/usersController');

const ctrlWrapper = require('../../helper/apiHelpers');

const { validator } = require('../../middlewares/validator');

const { schemas } = require('../../models/users');

const router = express.Router();

router.post('/signup', validator(schemas.signupSchema), ctrlWrapper(singup));
router.post('/login', validator(schemas.loginSchema), ctrlWrapper(login));
router.get('/logout', authentificate, ctrlWrapper(logout));
router.get('/current', authentificate, ctrlWrapper(getCurrentUser));
router.patch(
  '/',
  authenticate,
  validator(schemas.subscriptionSchema),
  ctrlWrapper(updateSubscription)
);

module.exports = router;
