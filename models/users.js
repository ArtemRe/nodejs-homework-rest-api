const { Schema, model } = require('mongoose');
const Joi = require('joi');
const SchemaErrors = require('../middlewares/SchemaErrors');

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    required: true,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
});

userSchema.post('save', SchemaErrors);

const signupSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const verifyEmailShema = Joi.object({
  email: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

const schemas = {
  signupSchema,
  loginSchema,
  subscriptionSchema,
  verifyEmailShema,
};

const User = model('user', userSchema);

module.exports = { User, schemas };
