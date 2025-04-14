import { Request, Response } from 'express';
import { sendContactEmail } from '../services/contact.service';
import { validateInput } from '../utils/validateInput';

export const handleContactForm = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, email, message } = req.body;

  const error = validateInput(name, email, message);
  if (error) return res.status(400).json({ error });

  try {
    await sendContactEmail(name, email, message);
    return res.status(200).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Email sending failed:', err);
    return res.status(500).json({ error: 'Something went wrong, please try again later.' });
  }
};
