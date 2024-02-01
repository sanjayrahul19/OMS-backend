import nodeMailer from 'nodemailer';
import { config } from '../config/index';
import BaseConfig from '../config/base-config';

class MailConfig extends BaseConfig {
  constructor() {
    super();
  }

  sendEmail(email, subject, text) {
    const transporter = nodeMailer.createTransport({
      host: config.ENV.SMTP_HOST,
      port: config.ENV.SMTP_PORT,
      secure: true,
      auth: {
        user: config.ENV.SMTP_USERNAME,
        pass: config.ENV.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: config.ENV.EMAIL_FROM,
      to: email,
      subject: subject,
      attachDataUrls: true,
      html: text,
    };

    try {
      const info = transporter.sendMail(mailOptions);
      console.log('Mail sent:', info);
      return 'mailSent';
    } catch (err) {
      console.error('Mail sending error:', err.message);
      return err.message;
    }
  }
}

export default new MailConfig();
