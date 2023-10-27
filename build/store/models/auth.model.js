"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthDBModels = void 0;
const user_schema_1 = require("../schemas/user.schema");
const infuencer_schema_1 = require("../schemas/infuencer.schema");
const createAuthDBModels = (authDBModel) => {
    let User = authDBModel.model('User', user_schema_1.userSchema);
    let Influencer = authDBModel.model('Influencer', infuencer_schema_1.influencerSchema);
    return {
        User,
        Influencer
    };
};
exports.createAuthDBModels = createAuthDBModels;
