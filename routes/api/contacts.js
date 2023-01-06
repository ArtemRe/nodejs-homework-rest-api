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
const isValidId = require('../../middlewares/isValidId');

const { validator } = require('../../middlewares/validator');
const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/', ctrlWrapper(getContacts));
router.get('/:contactId', isValidId, ctrlWrapper(getContactById));
router.post('/', validator(schemas.addContactSchema), ctrlWrapper(addContact));
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContact));
router.put(
  '/:contactId',
  isValidId,
  validator(schemas.addContactSchema),
  ctrlWrapper(updateContactById)
);
router.patch(
  '/:contactId/favorite',
  isValidId,
  validator(schemas.updateFavoriteSchema),
  ctrlWrapper(updateContactFavorite)
);

module.exports = router;
