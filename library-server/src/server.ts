import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "./config";
import { registerRoutes } from "./routes";

const PORT = config.server.port;
const app: Express = express();
 
app.use(express.json());
app.use(cors());

(async function startUp() {
    try {
        await mongoose.connect(config.mongo.url);
        console.log("Connected to the database successfully");
 
        registerRoutes(app)
 
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.log(err, "Could not connect to the database");
    } 
})();
