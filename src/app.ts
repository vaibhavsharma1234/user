import * as dotenv from "dotenv";
import express from "express";
// import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";

import { routes } from "./routes"

dotenv.config();

class Server {

    public server: express.Application;
    public routes: {
        path: string,
        router: express.Router,
        middleware?: any
    }[];
    
    constructor() {
        this.init();
    }

    private init = async() => {
		this.server = express();
        this.middleware();
		// await this.connectDB();
        this.configRoutes();
        this.start();
    }

    private middleware() {
       
        this.server.use(cors());
        // this.server.use(express.json());
        this.server.use(express.json({limit: '50mb'}));
        this.server.use(express.urlencoded({extended: false, limit: '50mb'}));
    }

    private async connectDB(){
        try {
            if(process.env.DB_URI){

                await mongoose.connect(process.env.DB_URI, {
                    dbName: "products",
                    user: process.env.DB_USER,
                    pass: process.env.DB_PASSWORD
                });

                const db = mongoose.connection;

                if(mongoose.connection.readyState){
                    console.log('🟢 Connected to MongoDB');
                }

                db.on('error', (error) => {
                    console.error('🔴 MongoDB connection error:', error);
                });

                db.once('open', () => {
                    console.log('🟢 Connected to MongoDB');
                });
            } else {
                throw new Error("DB_URI missing")
            }
        }
        catch(e){
            console.log("🔴 Failed to connect to DB")
        }
    }

    private configRoutes = () => {
        this.routes = routes;
       
        this.routes.map((route) => {
            if (!route.middleware)
                return this.server.use(route.path, route.router);
            return this.server.use(route.path, route.middleware, route.router);
        });
    };

    public start = () => {
        this.server.listen(process.env.PORT || 3000, () => {
            // console.log(this.routes)
            console.log(
                `🟢 Server is running on port ${process.env.PORT || 3002} 🎉`
            );
        });
        this.server.get("/", (req, res) => {
            res.send("Hello!! WELCOME TO SILISOUL ⚡️");
        });
    };

}

export default new Server().server;