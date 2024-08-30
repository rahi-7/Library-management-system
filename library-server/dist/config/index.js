"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.MONGO_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.MONGO_URL = process.env.MONGO_URI;
const PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 8000;
const ROUNDS = process.env.SERVER_ROUNDS ? Number(process.env.SERVER_ROUNDS) : Math.floor(Math.random() * 11);
exports.config = {
    mongo: {
        url: exports.MONGO_URL
    },
    server: {
        port: PORT,
        rounds: ROUNDS
    }
};
