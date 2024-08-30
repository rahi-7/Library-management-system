import express from "express";
const router = express.Router();

import AuthController from "../controllers/AuthController";
import { Schemas, ValidateSchema } from "../middlewares/Validation";



router.post("/register", ValidateSchema(Schemas.user.create, "body"),AuthController.handleRegister);
router.post("/login", ValidateSchema(Schemas.user.login, "body"), AuthController.handleLogin);

export = router