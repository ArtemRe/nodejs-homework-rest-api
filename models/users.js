const { Schema, model } = require('mongoose');
const Joi = require('joi');
const SchemaErrors = require('../middlewares/SchemaErrors');

const userSchema = new Schema(
  {
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
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', SchemaErrors);

userSchema.post('save', handleSchemaErrors);

const signupSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
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
};

const User = model('user', userSchema);

module.exports = { User, schemas };
