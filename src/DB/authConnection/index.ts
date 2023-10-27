import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { createAuthDBModels } from "../../store/models/auth.model";
import { createPlanDBModels } from "../../store/models/plan.model"; // Import a function to create plan DB models

dotenv.config();

class DBConnection {
    private static instance: DBConnection;
    private authDatabase: mongoose.Connection;
    private authDBModels;
    private planDatabase: mongoose.Connection;
    private planDBModels; // Add models for the "plan" database

    private constructor() {}

    public static getInstance() {
        if (!this.instance) {
            this.instance = new DBConnection();
            this.instance.initializeConnection();
        }
        return this.instance;
    }

    private async initializeConnection() {
        try {
            console.log("Establishing Auth Database connection");
            console.log(process.env.AUTH_DB_URI); // Use a separate environment variable for the "auth" DB
            const connectionUri = process.env.DB_URI;

            this.authDatabase = mongoose.createConnection(connectionUri, {
                dbName: "auth",
                user: process.env.DB_USER,
                pass: process.env.DB_PASSWORD,
            });

            console.log("🟢 Connected to Auth DB!");

            //@ts-ignore
            this.authDBModels = createAuthDBModels(this.authDatabase);

            // Similar steps for connecting to the "plan" database
            console.log("Establishing Plan Database connection");
            // console.log(process.env.PLAN_DB_URI); // Use a separate environment variable for the "plan" DB
            // const connectionUri = process.env.DB_URI;

            this.planDatabase = mongoose.createConnection(connectionUri, {
                dbName: "plan",
                user: process.env.DB_USER,
                pass: process.env.DB_PASSWORD,
            });

            console.log("🟢 Connected to Plan DB!");

            //@ts-ignore
            this.planDBModels = createPlanDBModels(this.planDatabase);

        } catch (error) {
            console.log("🔴 MONGODB_CLIENT closed: ", error.message);
        }
    }

    public getAuthDBModels() {
        return this.authDBModels;
    }

    public getPlanDBModels() {
        return this.planDBModels;
    }
}

export const createAuthDbConnection = () => {
    const dbConnection = DBConnection.getInstance();
    const authDBModels = dbConnection.getAuthDBModels();

    return authDBModels ? { success: true, authDBModels: authDBModels } : { success: false };
};

export const createPlanDbConnection = () => {
    const dbConnection = DBConnection.getInstance();
    const planDBModels = dbConnection.getPlanDBModels();

    return planDBModels ? { success: true, planDBModels: planDBModels } : { success: false };
};
