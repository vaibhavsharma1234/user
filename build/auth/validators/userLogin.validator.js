"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginValidatorSchema = void 0;
const joi_1 = __importDefault(require("joi"));
function formatPhoneNumber(phoneNumber) {
    if (phoneNumber.startsWith('+91')) {
        return phoneNumber; // Already has the "+91" prefix, no transformation needed.
    }
    else {
        // Use a regular expression to extract only the digits from the phone number.
        const digitsOnly = phoneNumber.replace(/\D/g, '');
        if (digitsOnly.length === 10) {
            const formattedPhoneNumber = '+91' + digitsOnly;
            return formattedPhoneNumber;
        }
        else {
            throw new Error('Invalid phone number. It should be a 10-digit number.');
        }
    }
}
exports.userLoginValidatorSchema = joi_1.default.object({
    emailId: joi_1.default.string().email().optional(),
    phoneNumber: joi_1.default.string().optional().custom(formatPhoneNumber),
    password: joi_1.default.string().required(),
}).or('emailId', 'phoneNumber');
// means login either from phone number or emailId but password is always required 
