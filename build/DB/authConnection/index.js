"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlanDbConnection = exports.createAuthDbConnection = void 0;
const dotenv = __importStar(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_model_1 = require("../../store/models/auth.model");
const plan_model_1 = require("../../store/models/plan.model"); // Import a function to create plan DB models
dotenv.config();
class DBConnection {
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new DBConnection();
            this.instance.initializeConnection();
        }
        return this.instance;
    }
    initializeConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Establishing Auth Database connection");
                console.log(process.env.AUTH_DB_URI); // Use a separate environment variable for the "auth" DB
                const connectionUri = process.env.DB_URI;
                this.authDatabase = mongoose_1.default.createConnection(connectionUri, {
                    dbName: "auth",
                    user: process.env.DB_USER,
                    pass: process.env.DB_PASSWORD,
                });
                console.log("🟢 Connected to Auth DB!");
                //@ts-ignore
                this.authDBModels = (0, auth_model_1.createAuthDBModels)(this.authDatabase);
                // Similar steps for connecting to the "plan" database
                console.log("Establishing Plan Database connection");
                // console.log(process.env.PLAN_DB_URI); // Use a separate environment variable for the "plan" DB
                // const connectionUri = process.env.DB_URI;
                this.planDatabase = mongoose_1.default.createConnection(connectionUri, {
                    dbName: "plan",
                    user: process.env.DB_USER,
                    pass: process.env.DB_PASSWORD,
                });
                console.log("🟢 Connected to Plan DB!");
                //@ts-ignore
                this.planDBModels = (0, plan_model_1.createPlanDBModels)(this.planDatabase);
            }
            catch (error) {
                console.log("🔴 MONGODB_CLIENT closed: ", error.message);
            }
        });
    }
    getAuthDBModels() {
        return this.authDBModels;
    }
    getPlanDBModels() {
        return this.planDBModels;
    }
}
const createAuthDbConnection = () => {
    const dbConnection = DBConnection.getInstance();
    const authDBModels = dbConnection.getAuthDBModels();
    return authDBModels ? { success: true, authDBModels: authDBModels } : { success: false };
};
exports.createAuthDbConnection = createAuthDbConnection;
const createPlanDbConnection = () => {
    const dbConnection = DBConnection.getInstance();
    const planDBModels = dbConnection.getPlanDBModels();
    return planDBModels ? { success: true, planDBModels: planDBModels } : { success: false };
};
exports.createPlanDbConnection = createPlanDbConnection;
