import Joi from "joi";

function formatPhoneNumber(phoneNumber: string): string {
    if (phoneNumber.startsWith('+91')) {
      return phoneNumber; // Already has the "+91" prefix, no transformation needed.
    } else {
      // Use a regular expression to extract only the digits from the phone number.
      const digitsOnly = phoneNumber.replace(/\D/g, '');
  
      if (digitsOnly.length === 10) {
        const formattedPhoneNumber = '+91' + digitsOnly;
        return formattedPhoneNumber;
      } else {
        throw new Error('Invalid phone number. It should be a 10-digit number.');
      }
    }
  }

  export const userLoginValidatorSchema = Joi.object({
    emailId: Joi.string().email().optional(),
    phoneNumber: Joi.string().optional().custom(formatPhoneNumber),
    password: Joi.string().required(),
  }).or('emailId', 'phoneNumber');

  // means login either from phone number or emailId but password is always required 