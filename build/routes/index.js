"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const auth_1 = require("../auth/routes/auth");
exports.routes = [
    {
        path: "/v1/auth",
        router: auth_1.auth_routes
    },
];
