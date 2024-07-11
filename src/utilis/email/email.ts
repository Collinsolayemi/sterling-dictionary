import nodemailer from 'nodemailer';

export interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

export class EmailSender {
  transporter: any;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false, // Set to true if using SSL/TLS
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
  }

  async sendEmail(options: EmailOptions) {
    const { email, subject, message } = options;
    // Define mail options
    const mailOptions = {
      from: process.env.USER,
      to: email,
      subject,
      html: message,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}

export default EmailSender;