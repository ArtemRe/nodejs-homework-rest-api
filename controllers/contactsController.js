const { Contact } = require('../models/contact');

const getContacts = async (_, res) => {
  const data = await Contact.find();
  res.status(200).json(data);
};

const addContact = async (req, res) => {
  const data = await Contact.create(req.body);
  return res.status(201).json(data);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findById(contactId);
  if (!data) {
    return res.status(400).json({ message: 'Not found' });
  }
  return res.status(200).json(data);
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!data) {
    return res.status(400).json({ message: 'Not found' });
  }
  return res.status(200).json(data);
};

const updateContactFavorite = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!data) {
    return res.status(400).json({ message: 'Not found' });
  }
  return res.status(200).json(data);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndRemove(contactId);
  if (data) {
    return res.status(200).json({ message: 'contact deleted' });
  }
  res.status(400).json({ message: 'Not found' });
};

module.exports = {
  addContact,
  getContacts,
  getContactById,
  deleteContact,
  updateContactById,
  updateContactFavorite,
};
