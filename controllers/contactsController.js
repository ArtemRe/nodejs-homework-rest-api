const { Contact } = require('../models/contact');

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const query = favorite ? { owner, favorite } : { owner };

  const skip = (page - 1) * limit;
  const data = await Contact.find(query, '', {
    skip,
    limit: Number(limit),
  });
  res.status(200).json(data);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const data = await Contact.create({ ...req.body, owner });
  return res.status(201).json(data);
};

const getContactById = async (req, res) => {
  const { contactId: _id } = req.params;
  const { _id: owner } = req.user;
  const data = await Contact.findOne({ _id, owner });
  if (!data) {
    return res.status(400).json({ message: 'Not found' });
  }
  return res.status(200).json(data);
};

const updateContactById = async (req, res) => {
  const { contactId: _id } = req.params;
  const { _id: owner } = req.user;
  const data = await Contact.findByIdAndUpdate({ _id, owner }, req.body, {
    new: true,
  });
  if (!data) {
    return res.status(400).json({ message: 'Not found' });
  }
  return res.status(200).json(data);
};

const updateContactFavorite = async (req, res) => {
  const { contactId: _id } = req.params;
  const { _id: owner } = req.user;
  const data = await Contact.findByIdAndUpdate({ _id, owner }, req.body, {
    new: true,
  });
  if (!data) {
    return res.status(400).json({ message: 'Not found' });
  }
  return res.status(200).json(data);
};

const deleteContact = async (req, res) => {
  const { contactId: _id } = req.params;
  const { _id: owner } = req.user;
  const data = await Contact.findByIdAndRemove({ _id, owner });
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
