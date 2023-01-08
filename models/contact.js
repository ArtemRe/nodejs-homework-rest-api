const { Schema, model } = require('mongoose');
const Joi = require('joi');
const SchemaErrors = require('../middlewares/SchemaErrors');

const addContactSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email(),
  phone: Joi.string().min(10).max(14).required(),
  favorite: {
    type: Joi.bool(),
  },
});

const updateFavoriteSchema = Joi.object({
  favorite: {
    type: Joi.bool().required(),
  },
});

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      require: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', SchemaErrors);

const schemas = {
  addContactSchema,
  updateFavoriteSchema,
};

const Contact = model('contact', contactSchema);

module.exports = { Contact, schemas };
