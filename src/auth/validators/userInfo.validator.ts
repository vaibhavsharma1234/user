import Joi from "joi";
export const formatPhoneNumber=(phoneNumber: string): string=> {
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

  export const userValidatorSchema = Joi.object({
    name: Joi.string().required(),
    

    username: Joi.string().required(),
    emailId: Joi.string().email().required(),
    phoneNumber: Joi.string().required().custom(formatPhoneNumber),
    password: Joi.string().required(),
    role:Joi.string().required()
  });