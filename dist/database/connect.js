"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_promise_1 = __importDefault(require("pg-promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const initOptions = {};
const pgp = (0, pg_promise_1.default)(initOptions);
const connection = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Use true if you have a valid SSL certificate
    },
};
const db = pgp(connection);
exports.default = db;
