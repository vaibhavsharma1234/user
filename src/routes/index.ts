import { auth_routes } from "../auth/routes/auth";
import { verifyToken } from "../user/middleware";
import { user_profile_routes } from "../user/routes";
import { influencer_routes } from "../influencer/routes";
import { workout_routes } from "../plans/workout/routes";
export const routes = [
    {
        path: "/v1/auth",
        router: auth_routes
    },
    {
        path:"/v1/user",
        router:user_profile_routes,
        middleware:verifyToken
        

    },
    {
        path:"/v1/influencer",
        router:influencer_routes,
        middleware:verifyToken
        

    },
    {
        path:"/v1/workout",
        router:workout_routes,
        middleware:verifyToken
    }
    
]
