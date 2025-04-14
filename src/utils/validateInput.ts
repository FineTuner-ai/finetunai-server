export const validateInput = (name: string, email: string, message: string): string | null => {
    if (!name || !email || !message) return 'All fields are required.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Invalid email format.';
    return null;
  };
  