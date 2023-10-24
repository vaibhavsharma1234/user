"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthDBModels = void 0;
const user_schema_1 = require("../schemas/user.schema");
const createAuthDBModels = (authDBModel) => {
    let User = authDBModel.model('User', user_schema_1.userSchema);
    return {
        User,
    };
};
exports.createAuthDBModels = createAuthDBModels;
