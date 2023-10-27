"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const auth_1 = require("../auth/routes/auth");
const middleware_1 = require("../user/middleware");
const routes_1 = require("../user/routes");
const routes_2 = require("../influencer/routes");
const routes_3 = require("../plans/workout/routes");
exports.routes = [
    {
        path: "/v1/auth",
        router: auth_1.auth_routes
    },
    {
        path: "/v1/user",
        router: routes_1.user_profile_routes,
        middleware: middleware_1.verifyToken
    },
    {
        path: "/v1/influencer",
        router: routes_2.influencer_routes,
        middleware: middleware_1.verifyToken
    },
    {
        path: "/v1/workout",
        router: routes_3.workout_routes,
        middleware: middleware_1.verifyToken
    }
];
