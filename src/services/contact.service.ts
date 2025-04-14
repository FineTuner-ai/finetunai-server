import transporter from '../config/mailer';

export const sendContactEmail = async (name: string, email: string, message: string) => {
  const mailOptions = {
    from: `"Contact Form" <${process.env.SMTP_USER}>`,
    to: process.env.RECEIVER_EMAIL,
    subject: `New Contact Form Submission`,
    html: `
      <h3>New Message from ${name}</h3>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};
