// services/email-service.ts
import transporter from '../config/mailer';

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

const defaultRecipient = "info@finetunai.com";
const contactFormRecipient = process.env.CONTACT_FORM_RECIPIENT || defaultRecipient;

// Log configuration status
if (!process.env.CONTACT_FORM_RECIPIENT) {
  console.warn(`Warning: CONTACT_FORM_RECIPIENT not defined in .env, using default: ${defaultRecipient}`);
}

/**
 * Creates professional HTML email template for FineTuneAI
 */
const createProfessionalEmailTemplate = (title: string, content: string): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; color: #333333;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 650px; background-color: #ffffff; margin: 20px auto; border-radius: 4px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);">
        <!-- Header -->
        <tr>
          <td style="padding: 25px 40px; text-align: center; background-color: #0F172A; border-radius: 4px 4px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 600; letter-spacing: 0.5px;">FineTuneAI</h1>
          </td>
        </tr>
        
        <!-- Subheader -->
        <tr>
          <td style="background-color: #F1F5F9; padding: 15px 40px; border-bottom: 1px solid #E2E8F0;">
            <h2 style="color: #334155; margin: 0; font-size: 18px; font-weight: 500;">${title}</h2>
          </td>
        </tr>
        
        <!-- Content -->
        <tr>
          <td style="padding: 30px 40px;">
            ${content}
          </td>
        </tr>
        
        <!-- Footer -->
        <tr>
          <td style="background-color: #F8FAFC; text-align: center; padding: 20px 40px; color: #64748B; font-size: 13px; border-top: 1px solid #E2E8F0; border-radius: 0 0 4px 4px;">
            <p style="margin: 0 0 5px;">© ${new Date().getFullYear()} FineTuneAI. All rights reserved.</p>
            <p style="margin: 0;">This is an automated message. Please do not reply directly to this email.</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

/**
 * Send contact form data via email using the new format
 */
export const sendContactFormEmail = async (formData: ContactFormData): Promise<any> => {
  // Use the pre-defined recipient constant
  const recipient = contactFormRecipient;
  
  // Set up email content
  const subject = formData.subject || `New Inquiry from ${formData.name} - FineTuneAI Contact Form`;
  
  // Create plain text version of email
  const text = `
    Name: ${formData.name}
    Email: ${formData.email}
    
    Message:
    ${formData.message}
  `;
  
  // Create branded content for HTML email
  const emailContent = `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
      <tr>
        <td style="padding-bottom: 20px;">
          <p style="margin: 0 0 5px; color: #64748B; font-size: 14px;">Contact Information</p>
          <table width="100%" style="border-collapse: collapse;">
            <tr>
              <td width="100" style="padding: 8px 0; color: #334155; font-weight: 600; font-size: 15px;">Name:</td>
              <td style="padding: 8px 0; font-size: 15px;">${formData.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #334155; font-weight: 600; font-size: 15px;">Email:</td>
              <td style="padding: 8px 0; font-size: 15px;">
                <a href="mailto:${formData.email}" style="color: #2563EB; text-decoration: none;">${formData.email}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding-top: 10px; border-top: 1px solid #E2E8F0;">
          <p style="margin: 15px 0 10px; color: #64748B; font-size: 14px;">Message Content</p>
          <div style="background-color: #F8FAFC; padding: 20px; border-radius: 4px; line-height: 1.6; font-size: 15px; color: #1E293B;">
            ${formData.message.replace(/\n/g, '<br>')}
          </div>
        </td>
      </tr>
    </table>
  `;
  
  // Use the professional template
  const html = createProfessionalEmailTemplate("Contact Form Submission", emailContent);
  
  // Prepare email options with explicit recipient
  const mailOptions = {
    from: `"FineTuneAI" <${process.env.SMTP_USER}>`,
    to: recipient,
    replyTo: formData.email,
    subject,
    text,
    html,
  };
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Contact form email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Failed to send contact form email:', error);
    throw error;
  }
};

/**
 * Original contact email function - maintained for compatibility but with updated styling
 */
export const sendContactEmail = async (name: string, email: string, message: string) => {
  // Create branded content for HTML email
  const emailContent = `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
      <tr>
        <td style="padding-bottom: 20px;">
          <p style="margin: 0 0 5px; color: #64748B; font-size: 14px;">Contact Information</p>
          <table width="100%" style="border-collapse: collapse;">
            <tr>
              <td width="100" style="padding: 8px 0; color: #334155; font-weight: 600; font-size: 15px;">Name:</td>
              <td style="padding: 8px 0; font-size: 15px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #334155; font-weight: 600; font-size: 15px;">Email:</td>
              <td style="padding: 8px 0; font-size: 15px;">
                <a href="mailto:${email}" style="color: #2563EB; text-decoration: none;">${email}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding-top: 10px; border-top: 1px solid #E2E8F0;">
          <p style="margin: 15px 0 10px; color: #64748B; font-size: 14px;">Message Content</p>
          <div style="background-color: #F8FAFC; padding: 20px; border-radius: 4px; line-height: 1.6; font-size: 15px; color: #1E293B;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </td>
      </tr>
    </table>
  `;
  
  // Use the professional template
  const html = createProfessionalEmailTemplate("Contact Form Submission", emailContent);
  
  const mailOptions = {
    from: `"FineTuneAI" <${process.env.SMTP_USER}>`,
    to: process.env.RECEIVER_EMAIL || contactFormRecipient,
    replyTo: email,
    subject: `New Inquiry from ${name} - FineTuneAI Contact Form`,
    html,
  };
  
  return transporter.sendMail(mailOptions);
};