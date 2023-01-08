const express = require('express');

const {
  addContact,
  getContacts,
  getContactById,
  deleteContact,
  updateContactById,
  updateContactFavorite,
} = require('../../controllers/contactsController');
const ctrlWrapper = require('../../helper/apiHelpers');
const authenticate = require('../../middlewares/authenticate ');
const isValidId = require('../../middlewares/isValidId');

const { validator } = require('../../middlewares/validator');
const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/', authenticate, ctrlWrapper(getContacts));
router.get('/:contactId', authenticate, isValidId, ctrlWrapper(getContactById));
router.post(
  '/',
  authenticate,
  validator(schemas.addContactSchema),
  ctrlWrapper(addContact)
);
router.delete(
  '/:contactId',
  authenticate,
  isValidId,
  ctrlWrapper(deleteContact)
);
router.put(
  '/:contactId',
  authenticate,
  isValidId,
  validator(schemas.addContactSchema),
  ctrlWrapper(updateContactById)
);
router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,
  validator(schemas.updateFavoriteSchema),
  ctrlWrapper(updateContactFavorite)
);

module.exports = router;
