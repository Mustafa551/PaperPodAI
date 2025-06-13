export const maskEmail = (email: string): string => {
  const [localPart, domain] = email.split('@');

  if (!localPart || !domain) return email; // Return original email if invalid format

  const visiblePart = localPart.slice(0, 4); // Show first 4 characters
  const maskedPart = '*'.repeat(localPart.length - 4); // Mask remaining characters

  return `${visiblePart}${maskedPart}@${domain}`;
};
