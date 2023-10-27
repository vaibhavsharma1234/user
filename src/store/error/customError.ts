import { EHTTPS_RESPONSE_CODE } from "../enums/HTTP_RESPONSE_CODE/responseCode.enum";

export class CustomError extends Error {
    statusCode: number;
  
    constructor(message: string, statusCode: number = EHTTPS_RESPONSE_CODE.SERVER_ERROR) {
      super(message);
      this.statusCode = statusCode;
    }
  }