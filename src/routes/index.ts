import { auth_routes } from "../auth/routes/auth";


export const routes = [
    {
        path: "/v1/auth",
        router: auth_routes
    },
    
]
