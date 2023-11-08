"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateSchema = void 0;
const Joi = require('joi'); // Import Joi and configure schemas
const userInfo_validator_1 = require("../../auth/validators/userInfo.validator");
exports.userUpdateSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30),
    emailId: Joi.string().email(),
    name: Joi.string(),
    phoneNumber: Joi.string().required().custom(userInfo_validator_1.formatPhoneNumber),
});
