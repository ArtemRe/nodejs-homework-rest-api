const sgMail = require('@sendgrid/mail');
const RequestError = require('./requestError');

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: 'rechembeiartem@gmail.com' };
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw RequestError(400, 'Error SendMail');
  }
};

module.exports = sendEmail;
