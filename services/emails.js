const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 *
 * @param {string} to
 * @param {string} subject
 * @param {html} body
 *
 * Usage example:
 * send(
 *   "test@gmail.com",
 *   "Test email",
 *   "Hola <strong>Test</strong>"
 * );
 *
 */

const send = async (to, subject, body) => {
  const msg = {
    to,
    from: process.env.EMAIL_FROM,
    subject,
    html: body,
  };

  try {
    await sgMail.send(msg);
    console.info(`Email sent to: ${to}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { send };
