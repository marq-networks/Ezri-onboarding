import nodemailer from 'nodemailer';

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    const host = process.env.SMTP_HOST || 'mail.marqnetworks.com';
    const user = process.env.SMTP_USER;
    
    if (!user) {
      console.warn('⚠️ SMTP_USER is not set. Email sending will likely fail.');
    }

    this.transporter = nodemailer.createTransport({
      host,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      name: process.env.SMTP_EHLO_DOMAIN, // Optional: useful for EHLO/HELO
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail(to: string, subject: string, html: string, text?: string) {
    const info = await this.transporter.sendMail({
      from: process.env.SMTP_FROM || '"MeetEzri" <noreply@meetezri.com>',
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>?/gm, ''), // fallback text generation
    });
    return info;
  }
}

export const emailService = new EmailService();
